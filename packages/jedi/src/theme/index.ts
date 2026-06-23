import { createTheme, type Theme } from '@mui/material/styles';
import { getColors, type ColorMode } from './colors';
import { fontFamily, desktopTypography, mobileTypography } from './typography';
import { spacing as spacingScale, jediTokens } from './tokens';

export { jediTokens, spacing } from './tokens';
export { getColors, type ColorMode } from './colors';
export { fontFamily, desktopTypography, mobileTypography } from './typography';

const baseSpacing = (factor: number) => `${spacingScale[factor] ?? factor * 8}px`;

export function buildJediTheme(mode: ColorMode = 'light'): Theme {
  const c = getColors(mode);

  const theme = createTheme({
    palette: {
      mode,
      text: { primary: c.text.primary, secondary: c.text.secondary, disabled: c.text.disabled },
      primary: { main: c.primary.main, dark: c.primary.dark, light: c.primary.light, contrastText: c.primary.contrast },
      secondary: { main: c.secondary.main, dark: c.secondary.dark, light: c.secondary.light, contrastText: c.secondary.contrast },
      error: { main: c.error.main, dark: c.error.dark, light: c.error.light, contrastText: c.error.contrast },
      warning: { main: c.warning.main, dark: c.warning.dark, light: c.warning.light, contrastText: c.warning.contrast },
      info: { main: c.info.main, dark: c.info.dark, light: c.info.light, contrastText: c.info.contrast },
      success: { main: c.success.main, dark: c.success.dark, light: c.success.light, contrastText: c.success.contrast },
      action: {
        active: c.action.active,
        hover: c.action.hover,
        selected: c.action.selected,
        disabled: c.action.disabled,
        disabledBackground: c.action['disabled-background'],
        focus: c.action.focus,
        hoverOpacity: mode === 'light' ? 0.04 : 0.08,
        selectedOpacity: mode === 'light' ? 0.08 : 0.16
      },
      background: { default: c.background.default, paper: c.background['paper-elevation-0'] },
      divider: c.other.divider
    },
    spacing: baseSpacing,
    shape: { borderRadius: 8 },
    typography: {
      fontFamily,
      ...desktopTypography
    },
    components: {
      MuiCard: { defaultProps: { variant: 'outlined' } },
      MuiPaper: { defaultProps: { variant: 'outlined' }, styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiButton: {
        styleOverrides: {
          root: { fontWeight: mode === 'dark' ? 600 : 500 },
          sizeLarge: desktopTypography.buttonLarge,
          sizeSmall: desktopTypography.buttonSmall
        }
      }
    }
  });

  const dn = theme.breakpoints.down('md');
  for (const [variant, override] of Object.entries(mobileTypography)) {
    Object.assign((theme.typography as Record<string, any>)[variant] ?? {}, { [dn]: override });
  }

  return theme;
}

export const jediTheme = buildJediTheme('light');
export const jediThemeDark = buildJediTheme('dark');

export default jediTokens;
