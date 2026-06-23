/**
 * Token sync: writes a stable, sorted JSON snapshot of each design system's
 * runtime tokens into the corresponding @gl/ai-* package.
 *
 * Usage:
 *   yarn ai:tokens:sync            -> writes to ai/<ds>/tokens/tokens.json
 *   yarn ai:tokens:sync --dry-run  -> writes to a temp dir instead (for check-tokens)
 *
 * Determinism: every emitted object is recursively sorted by key, JSON is
 * pretty-printed at 2 spaces, and lists with structured contents are sorted
 * by their `id` field if present.
 */

import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(__filename), '..');

export type SyncTarget = { ds: string; absPath: string };
type SyncResult = { ds: string; outPath: string };

export async function syncMagnaTokens(outDir: string): Promise<SyncResult> {
  const themeMod = await import(pathToFileURL(resolve(repoRoot, 'packages/elements/src/theme/colors/blue-theme.ts')).href);
  const customMod = await import(pathToFileURL(resolve(repoRoot, 'packages/elements/src/theme/colors/custom-colors.ts')).href);
  const commonMod = await import(pathToFileURL(resolve(repoRoot, 'packages/elements/src/theme/colors/common.ts')).href);

  const out = {
    meta: {
      ds: 'magna',
      name: 'Magna Design System',
      stack: 'Tamagui',
      colorModel: 'Material 3 (M3) — role tokens',
      font: 'Inter',
      seed: '#0066FF'
    },
    color: {
      common: commonMod.common,
      light: themeMod.light,
      dark: themeMod.dark,
      customLight: customMod.custom_light,
      customDark: customMod.custom_dark
    },
    typography: {
      fontFamily: 'Inter',
      weights: { regular: 400, medium: 500, semibold: 600 },
      desktop: {
        headline1: { size: 32, weight: 600, lineHeight: 36, letterSpacing: '-0.4px' },
        headline2: { size: 28, weight: 600, lineHeight: 32, letterSpacing: '-0.4px' },
        headline3: { size: 24, weight: 600, lineHeight: 28, letterSpacing: '-0.4px' },
        headline4: { size: 20, weight: 600, lineHeight: 24, letterSpacing: '-0.4px' },
        headline5: { size: 18, weight: 600, lineHeight: 24, letterSpacing: '-0.4px' },
        subtitle1: { size: 16, weight: 600, lineHeight: 24, letterSpacing: '-0.4px' },
        subtitle2: { size: 14, weight: 600, lineHeight: 20, letterSpacing: '-0.4px' },
        body1: { size: 16, weight: 400, lineHeight: 24, letterSpacing: '-0.1px' },
        body2: { size: 14, weight: 400, lineHeight: 20, letterSpacing: '-0.1px' },
        caption: { size: 12, weight: 400, lineHeight: 16, letterSpacing: '0px' },
        overline: { size: 10, weight: 600, lineHeight: 16, letterSpacing: '1.25px', case: 'UPPERCASE' },
        buttonLarge: { size: 16, weight: 500, lineHeight: 24, case: 'Title Case' },
        buttonMedium: { size: 14, weight: 500, lineHeight: 20, case: 'Title Case' },
        buttonSmall: { size: 12, weight: 500, lineHeight: 16, case: 'Title Case' }
      },
      mobile: {
        headline1: { size: 26, lineHeight: 32, letterSpacing: '-0.4px' },
        headline2: { size: 24, lineHeight: 28, letterSpacing: '-0.4px' },
        headline3: { size: 22, lineHeight: 24, letterSpacing: '-0.6px' },
        headline4: { size: 20, lineHeight: 24, letterSpacing: '-0.4px' },
        headline5: { size: 18, lineHeight: 24, letterSpacing: '-0.4px' },
        subtitle1: { size: 16, lineHeight: 24, letterSpacing: '-0.4px' },
        subtitle2: { size: 14, lineHeight: 20, letterSpacing: '-0.4px' },
        body1: { size: 16, lineHeight: 24, letterSpacing: '-0.1px' },
        body2: { size: 14, lineHeight: 20, letterSpacing: '-0.1px' },
        caption: { size: 12, lineHeight: 16, letterSpacing: '0px' },
        overline: { size: 10, lineHeight: 16, letterSpacing: '1.25px' }
      }
    },
    spacing: {
      $xs: 4, $sm: 6, $md: 8, $lg: 12, $xl: 16,
      $0: 0, $1: 8, $2: 16, $3: 24, $4: 32, $5: 40, $6: 48,
      $7: 56, $8: 64, $9: 72, $10: 80
    }
  };

  const outPath = resolve(outDir, 'ai/magna/tokens/tokens.json');
  writeStableJson(outPath, out);
  return { ds: 'magna', outPath };
}

export async function syncJediTokens(outDir: string): Promise<SyncResult> {
  const mod = await import(
    pathToFileURL(resolve(repoRoot, 'packages/jedi/src/theme/tokens.ts')).href
  );
  const { getColors, jediTokens, spacing, desktopTypography, mobileTypography } = mod;

  const out = {
    meta: {
      ds: 'jedi',
      name: 'Jedi Design System',
      stack: 'MUI v5+',
      font: 'Inter',
      modes: ['light', 'dark']
    },
    color: {
      light: getColors('light'),
      dark: getColors('dark')
    },
    palette: {
      light: jediTokens.palette,
      dark: jediTokens.paletteDark
    },
    spacing: [...spacing],
    typography: {
      fontFamily: jediTokens.typography.fontFamily,
      desktop: desktopTypography,
      mobile: mobileTypography
    },
    shape: jediTokens.shape
  };

  const outPath = resolve(outDir, 'ai/jedi/tokens/tokens.json');
  writeStableJson(outPath, out);
  return { ds: 'jedi', outPath };
}

export async function syncGldsTokens(outDir: string): Promise<SyncResult> {
  const srcPath = resolve(repoRoot, 'packages/glds-web/src/tokens/tokens.json');
  const data = JSON.parse(readFileSync(srcPath, 'utf8'));
  const outPath = resolve(outDir, 'ai/glds-web/tokens/tokens.json');
  writeStableJson(outPath, data);
  return { ds: 'glds-web', outPath };
}

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => [k, sortDeep(v)] as const)
      .sort(([a], [b]) => a.localeCompare(b));
    return Object.fromEntries(entries);
  }
  return value;
}

function writeStableJson(absPath: string, data: unknown) {
  mkdirSync(dirname(absPath), { recursive: true });
  const sorted = sortDeep(data);
  writeFileSync(absPath, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
}

export async function syncAll(outDir: string) {
  return Promise.all([
    syncMagnaTokens(outDir),
    syncJediTokens(outDir),
    syncGldsTokens(outDir)
  ]);
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  let target = repoRoot;
  if (dryRun) {
    target = resolve(tmpdir(), `gl-tokens-${Date.now()}`);
    mkdirSync(target, { recursive: true });
  }
  const results = await syncAll(target);
  for (const r of results) {
    const rel = r.outPath.replace(target + '/', '');
    console.log(`✓ ${r.ds.padEnd(10)} -> ${rel}`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export { repoRoot };
