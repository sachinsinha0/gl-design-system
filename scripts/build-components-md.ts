/**
 * Generate a human-readable `ai/<ds>/components.md` per DS from the
 * machine-readable `ai/<ds>/components/*.json` specs.
 *
 *   JSON  → source of truth for Figma plugins, audits, LLM context.
 *   MD    → for designers, PMs, partners reading on GitHub / in Notion.
 *
 * Re-run after editing any component JSON:  `yarn ai:components:md`
 */

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(__filename), '..');

const DS_LABEL: Record<string, string> = {
  magna: 'Magna',
  jedi: 'Jedi',
  'glds-web': 'GLDS-Web',
};
const dsDirs = Object.keys(DS_LABEL);

type Anatomy = { part: string; description: string; required?: boolean };
type Prop = { name: string; type: string; default?: unknown; description?: string; required?: boolean };
type Variant = { axis: string; values: string[]; default?: string; description?: string };
type StateDef = { name: string; description?: string };
type Example = { label: string; language?: string; snippet: string };
type Component = {
  id: string;
  name: string;
  dsId: string;
  summary: string;
  anatomy: Anatomy[];
  props: Prop[];
  variants: Variant[];
  states: StateDef[];
  a11y: string[];
  examples: Example[];
  doNot?: string[];
  tokensUsed?: string[];
};

function escapePipe(s: string): string {
  return s.replace(/\|/g, '\\|');
}

function fmtDefault(v: unknown): string {
  if (v === undefined) return '';
  if (typeof v === 'string') return '`' + v + '`';
  return '`' + JSON.stringify(v) + '`';
}

function renderComponent(c: Component): string {
  const lines: string[] = [];
  lines.push(`## ${c.name}`);
  lines.push('');
  lines.push(`\`${c.id}\` · ${c.dsId}`);
  lines.push('');
  lines.push(`> ${c.summary}`);
  lines.push('');

  if (c.anatomy?.length) {
    lines.push('### Anatomy');
    lines.push('');
    lines.push('| Part | Description | Required |');
    lines.push('| --- | --- | :---: |');
    for (const a of c.anatomy) {
      lines.push(`| \`${a.part}\` | ${escapePipe(a.description)} | ${a.required ? '✓' : ''} |`);
    }
    lines.push('');
  }

  if (c.props?.length) {
    lines.push('### Props');
    lines.push('');
    lines.push('| Name | Type | Default | Required |');
    lines.push('| --- | --- | --- | :---: |');
    for (const p of c.props) {
      lines.push(
        `| \`${p.name}\` | \`${escapePipe(p.type)}\` | ${fmtDefault(p.default)} | ${p.required ? '✓' : ''} |`,
      );
    }
    lines.push('');
  }

  if (c.variants?.length) {
    lines.push('### Variants');
    lines.push('');
    for (const v of c.variants) {
      const values = v.values.map((x) => `\`${x}\``).join(', ');
      const def = v.default ? ` _(default: \`${v.default}\`)_` : '';
      lines.push(`- **${v.axis}** — ${values}${def}`);
    }
    lines.push('');
  }

  if (c.states?.length) {
    lines.push('### States');
    lines.push('');
    for (const s of c.states) {
      lines.push(`- **${s.name}**${s.description ? ' — ' + s.description : ''}`);
    }
    lines.push('');
  }

  if (c.a11y?.length) {
    lines.push('### Accessibility');
    lines.push('');
    for (const a of c.a11y) lines.push(`- ${a}`);
    lines.push('');
  }

  if (c.examples?.length) {
    lines.push('### Examples');
    lines.push('');
    for (const ex of c.examples) {
      lines.push(`**${ex.label}**`);
      lines.push('');
      lines.push('```' + (ex.language ?? ''));
      lines.push(ex.snippet);
      lines.push('```');
      lines.push('');
    }
  }

  if (c.doNot?.length) {
    lines.push('### Do not');
    lines.push('');
    for (const d of c.doNot) lines.push(`- ${d}`);
    lines.push('');
  }

  if (c.tokensUsed?.length) {
    lines.push('### Tokens used');
    lines.push('');
    lines.push(c.tokensUsed.map((t) => `\`${t}\``).join(', '));
    lines.push('');
  }

  return lines.join('\n');
}

function renderDoc(dsId: string, components: Component[]): string {
  const label = DS_LABEL[dsId] ?? dsId;
  const sorted = [...components].sort((a, b) => a.name.localeCompare(b.name));
  const toc = sorted.map((c) => `- [${c.name}](#${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')})`).join('\n');

  return [
    `# ${label} · Component specifications`,
    '',
    `> Human-readable component spec for designers, PMs, and partners. Generated from \`ai/${dsId}/components/*.json\` — do not edit by hand.`,
    '',
    `**${sorted.length} component${sorted.length === 1 ? '' : 's'}**`,
    '',
    toc,
    '',
    '---',
    '',
    sorted.map(renderComponent).join('\n---\n\n'),
  ].join('\n');
}

let total = 0;
for (const ds of dsDirs) {
  const dir = resolve(repoRoot, 'ai', ds, 'components');
  if (!existsSync(dir)) {
    console.log(`· ${ds}: no components/ directory, skipping`);
    continue;
  }
  const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
  const components: Component[] = files
    .map((f) => JSON.parse(readFileSync(resolve(dir, f), 'utf8')) as Component)
    .sort((a, b) => a.name.localeCompare(b.name));

  const out = resolve(repoRoot, 'ai', ds, 'components.md');
  writeFileSync(out, renderDoc(ds, components));
  total += components.length;
  console.log(`✓ ${ds}: wrote components.md (${components.length} component${components.length === 1 ? '' : 's'})`);
}

console.log(`\nGenerated ${total} component spec${total === 1 ? '' : 's'} across ${dsDirs.length} design systems.`);
