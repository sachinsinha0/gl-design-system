/**
 * Token drift check: re-syncs all three DS token snapshots into a temp directory
 * and diffs them against the committed `ai/<ds>/tokens/tokens.json`. Exits 1 on
 * any difference (with a unified diff so the dev knows what changed).
 */

import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { syncAll, repoRoot } from './sync-tokens.ts';

const __filename = fileURLToPath(import.meta.url);
void __filename;

function unifiedDiff(a: string, b: string, label: string): string {
  if (a === b) return '';
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  const max = Math.max(aLines.length, bLines.length);
  const out: string[] = [`--- committed/${label}`, `+++ generated/${label}`];
  for (let i = 0; i < max; i++) {
    if (aLines[i] !== bLines[i]) {
      if (aLines[i] !== undefined) out.push(`- ${aLines[i]}`);
      if (bLines[i] !== undefined) out.push(`+ ${bLines[i]}`);
    }
  }
  return out.slice(0, 200).join('\n');
}

async function main() {
  const tmp = mkdtempSync(resolve(tmpdir(), 'gl-tokens-check-'));
  const results = await syncAll(tmp);

  let drift = 0;
  for (const r of results) {
    const rel = r.outPath.replace(tmp + '/', '');
    const committed = resolve(repoRoot, rel);
    if (!existsSync(committed)) {
      console.error(`✗ ${r.ds}: committed snapshot missing at ${rel}`);
      drift++;
      continue;
    }
    const generated = readFileSync(r.outPath, 'utf8');
    const onDisk = readFileSync(committed, 'utf8');
    if (generated !== onDisk) {
      console.error(`✗ ${r.ds}: drift detected in ${rel}`);
      console.error(unifiedDiff(onDisk, generated, rel));
      drift++;
    } else {
      console.log(`✓ ${r.ds}: ${rel} up to date`);
    }
  }
  void dirname;
  if (drift > 0) {
    console.error(`\n${drift} token snapshot(s) out of sync. Run \`yarn ai:tokens:sync\`.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
