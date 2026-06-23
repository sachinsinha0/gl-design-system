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
