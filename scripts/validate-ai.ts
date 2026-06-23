/**
 * AI lint: validates every JSON component definition under
 * `ai/<ds>/components/*.json` against `ai/_schema/component.schema.json`.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(__filename), '..');

const schemaPath = resolve(repoRoot, 'ai/_schema/component.schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const dsDirs = ['magna', 'jedi', 'glds-web'];
let failures = 0;
let validated = 0;

for (const ds of dsDirs) {
  const dir = resolve(repoRoot, 'ai', ds, 'components');
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
  for (const f of files) {
    const p = resolve(dir, f);
    if (!statSync(p).isFile()) continue;
    let data: unknown;
    try {
      data = JSON.parse(readFileSync(p, 'utf8'));
    } catch (err) {
      console.error(`✗ ${ds}/${f}: invalid JSON — ${(err as Error).message}`);
      failures++;
      continue;
    }
    const ok = validate(data);
    validated++;
    if (!ok) {
      console.error(`✗ ${ds}/${f}: schema violations`);
      for (const e of validate.errors ?? []) {
        console.error(`  ${e.instancePath} ${e.message}`);
      }
      failures++;
    } else if ((data as any).dsId !== ds) {
      console.error(`✗ ${ds}/${f}: dsId='${(data as any).dsId}' does not match folder '${ds}'`);
      failures++;
    } else {
      console.log(`✓ ${ds}/${f}`);
    }
  }
}

console.log(`\n${validated} component(s) validated, ${failures} failure(s).`);
if (failures > 0) process.exit(1);
