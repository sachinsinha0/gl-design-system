/**
 * Jedi typography tokens — single family Inter; weights 400/500/600.
 * Desktop and mobile scales per SKILL.md §3. There is intentionally no `h6`.
 */

export const fontFamily = '"Inter", -apple-system, "Segoe UI", Roboto, sans-serif';

export const desktopTypography = {
  h1: { fontSize: 32, fontWeight: 600, lineHeight: 1.125, letterSpacing: '-0.4px' },
  h2: { fontSize: 28, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.4px' },
  h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.167, letterSpacing: '-0.4px' },
  h4: { fontSize: 20, fontWeight: 600, lineHeight: 1.235, letterSpacing: '-0.4px' },
  h5: { fontSize: 18, fontWeight: 600, lineHeight: 1.334, letterSpacing: '-0.4px' },
  subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: 1.75, letterSpacing: '-0.4px' },
  subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: 1.57, letterSpacing: '-0.4px' },
  body1: { fontSize: 16, fontWeight: 400, lineHeight: 1.5, letterSpacing: '0px' },
  body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.43, letterSpacing: '0px' },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.66, letterSpacing: '0.4px' },
  overline: {
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 1.66,
    letterSpacing: '1.25px',
    textTransform: 'uppercase' as const
  },
  button: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0.4px',
    textTransform: 'uppercase' as const
  },
  buttonLarge: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0.46px',
    textTransform: 'uppercase' as const
  },
  buttonSmall: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0.46px',
    textTransform: 'uppercase' as const
  }
};

export const mobileTypography = {
  h1: { fontSize: 26, lineHeight: '32px', letterSpacing: '-0.4px' },
  h2: { fontSize: 24, lineHeight: '28px', letterSpacing: '-0.5px' },
  h3: { fontSize: 22, lineHeight: '26px', letterSpacing: '-0.4px' },
  h4: { fontSize: 20, lineHeight: '24px', letterSpacing: '-0.4px' },
  h5: { fontSize: 18, lineHeight: '22px', letterSpacing: '-0.4px' },
  subtitle1: { fontSize: 16, lineHeight: '24px', letterSpacing: '0px' },
  subtitle2: { fontSize: 14, lineHeight: '20px', letterSpacing: '0px' },
  body1: { fontSize: 14, lineHeight: '20px', letterSpacing: '0px' },
  body2: { fontSize: 12, lineHeight: '16px', letterSpacing: '0px' },
  caption: { fontSize: 10, lineHeight: '16px', letterSpacing: '0.4px' },
  overline: { fontSize: 10, lineHeight: '16px', letterSpacing: '1.25px' }
};

/**
 * Spec §3.3 — Component-level type tokens. Consumed by `buildJediTheme`
 * `components.<Mui*>.styleOverrides` so each component renders to spec
 * without callers having to remember the values.
 */
export const componentTypography = {
  inputLabel: { fontFamily, fontWeight: 400, fontSize: 12, lineHeight: '12px', letterSpacing: '0.15px' },
  inputText: { fontFamily, fontWeight: 400, fontSize: 16, lineHeight: '24px', letterSpacing: '0.15px' },
  helperText: { fontFamily, fontWeight: 400, fontSize: 12, lineHeight: '16px', letterSpacing: '0.4px' },
  chip: { fontFamily, fontWeight: 500, fontSize: 12, lineHeight: '16px', letterSpacing: '0.16px' },
  tooltip: { fontFamily, fontWeight: 500, fontSize: 10, lineHeight: '16px', letterSpacing: '0px' },
  alertTitle: { fontFamily, fontWeight: 500, fontSize: 16, lineHeight: 1.5, letterSpacing: '0.15px' },
  tableHeader: { fontFamily, fontWeight: 500, fontSize: 14, lineHeight: '24px', letterSpacing: '0.17px' },
  badgeLabel: { fontFamily, fontWeight: 500, fontSize: 12, lineHeight: '16px', letterSpacing: '0.14px' },
  avatarInitials: { fontFamily, fontWeight: 400, fontSize: 20, lineHeight: '24px', letterSpacing: '0.14px' },
  menuItem: { fontFamily, fontWeight: 400, fontSize: 16, lineHeight: 1.5, letterSpacing: '0.15px' },
  menuItemDense: { fontFamily, fontWeight: 400, fontSize: 14, lineHeight: '24px', letterSpacing: '0.17px' },
  listSubheader: {
    fontFamily,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '48px',
    letterSpacing: '0.1px'
  },
  bottomNavActiveLabel: {
    fontFamily,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: '0.4px'
  },
  // Emphasis variants from §3.1.
  subtitle1Bold: { fontFamily, fontWeight: 600, fontSize: 16, lineHeight: 1.75, letterSpacing: '0.35px' },
  subtitle2Bold: { fontFamily, fontWeight: 600, fontSize: 14, lineHeight: 1.57, letterSpacing: '0.1px' }
} as const;

