import { createTheme, type Theme } from '@mui/material/styles';
import { getColors, type ColorMode } from './colors';
import { fontFamily, desktopTypography, mobileTypography, componentTypography } from './typography';
import { spacing as spacingScale, jediTokens } from './tokens';

export { jediTokens, spacing } from './tokens';
export { getColors, type ColorMode, toCssVariables } from './colors';
export { fontFamily, desktopTypography, mobileTypography, componentTypography } from './typography';

const baseSpacing = (factor: number) => `${spacingScale[factor] ?? factor * 8}px`;

export function buildJediTheme(mode: ColorMode = 'light'): Theme {
  const c = getColors(mode);
  const isDark = mode === 'dark';

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
        hoverOpacity: isDark ? 0.08 : 0.04,
        selectedOpacity: isDark ? 0.16 : 0.08
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
      MuiPaper: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: { root: { backgroundImage: 'none' } }
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { fontWeight: isDark ? 600 : 500 },
          sizeLarge: desktopTypography.buttonLarge,
          sizeSmall: desktopTypography.buttonSmall
        }
      },
      // §3.3 — Inputs
      MuiInputLabel: {
        styleOverrides: { root: { ...componentTypography.inputLabel } }
      },
      MuiInputBase: {
        styleOverrides: { input: { ...componentTypography.inputText } }
      },
      MuiOutlinedInput: {
        styleOverrides: { input: { ...componentTypography.inputText } }
      },
      MuiFilledInput: {
        styleOverrides: {
          input: { ...componentTypography.inputText },
          root: { backgroundColor: c.other['filled-input-background'] }
        }
      },
      MuiFormHelperText: {
        styleOverrides: { root: { ...componentTypography.helperText } }
      },
      // §3.3 — Chips. Outlined variant per the flat-system rule.
      MuiChip: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: { ...componentTypography.chip },
          label: { ...componentTypography.chip }
        }
      },
      // §3.3 — Tooltip
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            ...componentTypography.tooltip,
            backgroundColor: c.other.snackbar,
            color: c.basic.white
          }
        }
      },
      // §3.3 — Alert: enforce the 160-p on 190-p tint recipe (§2.3).
      MuiAlertTitle: {
        styleOverrides: { root: { ...componentTypography.alertTitle } }
      },
      MuiAlert: {
        defaultProps: { variant: 'standard' },
        styleOverrides: {
          standardError: {
            backgroundColor: c.error['shades-190-p'],
            color: c.error['shades-160-p']
          },
          standardWarning: {
            backgroundColor: c.warning['shades-190-p'],
            color: c.warning['shades-160-p']
          },
          standardInfo: {
            backgroundColor: c.info['shades-190-p'],
            color: c.info['shades-160-p']
          },
          standardSuccess: {
            backgroundColor: c.success['shades-190-p'],
            color: c.success['shades-160-p']
          }
        }
      },
      // §3.3 — Table header. §6.6 rule 15: numeric columns right-align with tabular figures.
      MuiTableCell: {
        styleOverrides: {
          head: { ...componentTypography.tableHeader, color: c.text.secondary },
          root: { fontVariantNumeric: 'tabular-nums' }
        }
      },
      // §3.3 — Badge label
      MuiBadge: {
        styleOverrides: { badge: { ...componentTypography.badgeLabel } }
      },
      // §3.3 — Avatar initials
      MuiAvatar: {
        styleOverrides: { root: { ...componentTypography.avatarInitials } }
      },
      // §3.3 — Menu item (+ dense variant)
      MuiMenuItem: {
        styleOverrides: {
          root: ({ ownerState }: { ownerState: { dense?: boolean } }) => ({
            ...(ownerState.dense ? componentTypography.menuItemDense : componentTypography.menuItem)
          })
        }
      },
      // §3.3 — List subheader
      MuiListSubheader: {
        styleOverrides: {
          root: { ...componentTypography.listSubheader, color: c.text.secondary }
        }
      },
      // §3.3 — Bottom nav active label
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            '&.Mui-selected': { ...componentTypography.bottomNavActiveLabel }
          }
        }
      },
      // §2.6 — Use dividers sparingly; default to the 6%-light / 12%-dark token color.
      MuiDivider: {
        styleOverrides: { root: { borderColor: c.other.divider } }
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

