/**
 * Jedi token surface — palette + typography + spacing.
 *
 * Tokens are organized to match the Jedi SKILL.md:
 *   - `palette.<role>.main/dark/light/contrastText` (used by MUI's `createTheme`)
 *   - `spacing` is the indexed array `[0, 4, 8, 16, 24, 32, 40, 48, 64, 96, 128]`
 *   - `typography` mirrors the desktop scale (mobile overrides live in `buildTheme`)
 *
 * `jediTokens` is a verification snapshot of the LIGHT theme. For mode-aware
 * lookups, import `getColors(mode)` from `./colors` directly.
 */

import { getColors, type ColorMode } from './colors';
import { fontFamily, desktopTypography, mobileTypography } from './typography';

export { getColors, type ColorMode } from './colors';
export { fontFamily, desktopTypography, mobileTypography } from './typography';

export const spacing: ReadonlyArray<number> = [0, 4, 8, 16, 24, 32, 40, 48, 64, 96, 128];

const buildPalette = (mode: ColorMode) => {
  const c = getColors(mode);
  return {
    mode,
    primary: { main: c.primary.main, dark: c.primary.dark, light: c.primary.light, contrastText: c.primary.contrast },
    secondary: { main: c.secondary.main, dark: c.secondary.dark, light: c.secondary.light, contrastText: c.secondary.contrast },
    error: { main: c.error.main, dark: c.error.dark, light: c.error.light, contrastText: c.error.contrast },
    warning: { main: c.warning.main, dark: c.warning.dark, light: c.warning.light, contrastText: c.warning.contrast },
    info: { main: c.info.main, dark: c.info.dark, light: c.info.light, contrastText: c.info.contrast },
    success: { main: c.success.main, dark: c.success.dark, light: c.success.light, contrastText: c.success.contrast },
    text: { primary: c.text.primary, secondary: c.text.secondary, disabled: c.text.disabled },
    background: { default: c.background.default, paper: c.background['paper-elevation-0'] },
    divider: c.other.divider
  };
};

export const jediTokens = {
  palette: buildPalette('light'),
  paletteDark: buildPalette('dark'),
  spacing,
  typography: { fontFamily, ...desktopTypography },
  typographyMobile: mobileTypography,
  shape: { borderRadius: 8 }
} as const;

export type JediTokens = typeof jediTokens;
