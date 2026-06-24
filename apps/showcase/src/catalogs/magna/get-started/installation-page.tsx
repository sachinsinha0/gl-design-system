import { InstallPage, ASSET_ICONS, CodeBlock, GitInstallBlock } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/magna/skills/magna-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/magna/skills/magna-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/magna/skills/magna-design-system/reference.md?url';

const body = {
  p: (text: string) => <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>{text}</p>,
  small: (text: string) => <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{text}</p>,
  mono: (text: string) => (
    <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>
      {text}
    </code>
  ),
  stack: (...children: React.ReactNode[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
  ),
  row: (...children: React.ReactNode[]) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>{children}</div>
  ),
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />,
  tag: (text: string) => (
    <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, color: '#475569' }}>
      {text}
    </code>
  ),
};

export function InstallationPage() {
  return (
    <InstallPage
      dsLabel="Magna Design System"
      tagline="Learner-facing design system — Tamagui + M3 roles, Inter, light + dark, mobile-first clarity."
      packageName="@gl/elements"
      sourcePath="packages/elements · ai/magna"
      installCommand={'# Inside this monorepo\nyarn workspace <your-app> add @gl/elements\n\n# Fresh project (add peer deps too)\nyarn add @gl/elements tamagui react-native-web\nnpm install @gl/elements tamagui react-native-web'}
      tabs={[
        {
          id: 'skill',
          label: 'Claude skill',
          asset: {
            label: 'magna-design-system.SKILL.md',
            description: 'Full YAML-frontmatter skill — auto-loaded by Claude for learner-facing UI.',
            href: skillUrl,
            size: '~11 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'magna-design-system.SKILL.md',
          },
          body: body.stack(
            body.p('Drop the file into your project at:'),
            <CodeBlock key="path">{'.claude/skills/magna-design-system/SKILL.md'}</CodeBlock>,
            body.small('Claude reads the frontmatter and triggers on any "learner-facing UI / M3 / Tamagui" task.')
          ),
        },
        {
          id: 'context',
          label: 'Lean context (vibe)',
          asset: {
            label: 'magna-design-system.context.md',
            description: 'Compact ~1-page context — paste directly into ChatGPT, Cursor, or Copilot chat.',
            href: contextUrl,
            size: '~3 KB',
            icon: ASSET_ICONS.FileText,
            downloadAs: 'magna-design-system.context.md',
          },
          body: body.stack(
            body.p('Use when prompting from a chat surface that doesn\'t auto-load skills. Paste at the top of the conversation, then describe the screen you want to build.'),
            body.small('Same do/don\'t rules as the full reference, minus deep code examples — tuned for vibe coding where you trade depth for round-trip speed.')
          ),
        },
        {
          id: 'reference',
          label: 'Full reference',
          asset: {
            label: 'magna-design-system.reference.md',
            description: 'Complete spec — color, typography, components, accessibility, examples.',
            href: referenceUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'magna-design-system.reference.md',
          },
          body: body.stack(
            body.p('Attach as project-level context (Cursor "Docs" / Copilot workspace MD / Continue rules) when you want exhaustive guidance — tokens, full component table, accessibility checklist.')
          ),
        },
        {
          id: 'git',
          label: 'Git install',
          body: <GitInstallBlock dsId="magna" />,
        },
      ]}
    />
  );
}
