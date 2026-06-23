/**
 * Jedi color tokens — sourced from the Jedi SKILL.md.
 * `getColors(mode)` returns the complete color palette for either 'light' or 'dark'.
 *
 * Token names follow the SKILL.md exactly (kebab-case with `shades-*-p` suffixes).
 * Every status palette (`error`, `warning`, `info`, `success`) carries the full
 * interaction-shade set including `shades-160-p` (text-on-tint) and `shades-190-p`
 * (tint background).
 */

export type ColorMode = 'light' | 'dark';

const ink = '#212121';
const white = '#FFFFFF';

const alpha = (hex: string, a: number) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};

const inkA = (a: number) => alpha(ink, a);
const whiteA = (a: number) => `rgba(255,255,255,${a})`;

const lightStatusShades = {
  error: { 'shades-160-p': '#7A2828', 'shades-190-p': '#FFEBEB' },
  warning: { 'shades-160-p': '#7A6014', 'shades-190-p': '#FFF9E5' },
  info: { 'shades-160-p': '#1E3E6F', 'shades-190-p': '#E8F0FC' },
  success: { 'shades-160-p': '#215F29', 'shades-190-p': '#E9F8EB' }
};

const darkStatusShades = {
  error: { 'shades-160-p': '#FBB4AF', 'shades-190-p': '#180705' },
  warning: { 'shades-160-p': '#FFDCA8', 'shades-190-p': '#1A1104' },
  info: { 'shades-160-p': '#9ACFED', 'shades-190-p': '#000E15' },
  success: { 'shades-160-p': '#C2E4C3', 'shades-190-p': '#0A130B' }
};

const lightColors = {
  text: {
    primary: inkA(0.92),
    secondary: inkA(0.72),
    disabled: inkA(0.24),
    'primary-shades-4-p': inkA(0.04),
    'primary-shades-12-p': inkA(0.12),
    'primary-shades-30-p': inkA(0.3),
    'secondary-shades-4-p': inkA(0.04),
    'secondary-shades-18-p': inkA(0.18)
  },
  primary: {
    main: '#196AE5',
    dark: '#0F4089',
    light: '#4788EA',
    contrast: white,
    'shades-hover': alpha('#196AE5', 0.04),
    'shades-select': alpha('#196AE5', 0.08),
    'shades-12-p': alpha('#196AE5', 0.12),
    'shades-30-p': alpha('#196AE5', 0.3),
    'shades-50-p': alpha('#196AE5', 0.5)
  },
  secondary: {
    main: '#FF9800',
    dark: '#EF6C00',
    light: '#FFB74D',
    contrast: white,
    'shades-hover': alpha('#FF9800', 0.04),
    'shades-select': alpha('#FF9800', 0.08),
    'shades-12-p': alpha('#FF9800', 0.12),
    'shades-30-p': alpha('#FF9800', 0.3),
    'shades-50-p': alpha('#FF9800', 0.5)
  },
  error: {
    main: '#FF3333',
    dark: '#D10B25',
    light: '#F9494F',
    contrast: white,
    'shades-hover': alpha('#FF3333', 0.04),
    'shades-select': alpha('#FF3333', 0.08),
    'shades-12-p': alpha('#FF3333', 0.12),
    'shades-30-p': alpha('#FF3333', 0.3),
    'shades-50-p': alpha('#FF3333', 0.5),
    ...lightStatusShades.error
  },
  warning: {
    main: '#FFBF00',
    dark: '#FF6D00',
    light: '#FFD44D',
    contrast: white,
    'shades-hover': alpha('#FFBF00', 0.04),
    'shades-select': alpha('#FFBF00', 0.08),
    'shades-12-p': alpha('#FFBF00', 0.12),
    'shades-30-p': alpha('#FFBF00', 0.3),
    'shades-50-p': alpha('#FFBF00', 0.5),
    ...lightStatusShades.warning
  },
  info: {
    main: '#196AE5',
    dark: '#0F4089',
    light: '#4788EA',
    contrast: white,
    'shades-hover': alpha('#196AE5', 0.04),
    'shades-select': alpha('#196AE5', 0.08),
    'shades-12-p': alpha('#196AE5', 0.12),
    'shades-30-p': alpha('#196AE5', 0.3),
    'shades-50-p': alpha('#196AE5', 0.5),
    ...lightStatusShades.info
  },
  success: {
    main: '#22BB34',
    dark: '#00880F',
    light: '#74D176',
    contrast: white,
    'shades-hover': alpha('#22BB34', 0.04),
    'shades-select': alpha('#22BB34', 0.08),
    'shades-12-p': alpha('#22BB34', 0.12),
    'shades-30-p': alpha('#22BB34', 0.3),
    'shades-50-p': alpha('#22BB34', 0.5),
    ...lightStatusShades.success
  },
  action: {
    active: inkA(0.64),
    hover: inkA(0.04),
    selected: inkA(0.08),
    disabled: inkA(0.26),
    'disabled-background': inkA(0.12),
    focus: inkA(0.12)
  },
  background: {
    default: '#FAFAFA',
    'paper-elevation-0': white,
    'paper-elevation-2': white,
    'paper-elevation-8': white,
    'paper-elevation-16': white,
    'paper-elevation-24': white
  },
  other: {
    divider: inkA(0.06),
    'outlined-border-23-p': inkA(0.23),
    'filled-input-background': inkA(0.06),
    'standard-input-line': inkA(0.42),
    'backdrop-overlay': alpha(ink, 0.5),
    snackbar: ink,
    'rating-active': '#FFB400'
  },
  basic: { white, black: '#000000' }
};

const darkColors = {
  text: {
    primary: white,
    secondary: whiteA(0.7),
    disabled: whiteA(0.5),
    'primary-shades-4-p': whiteA(0.04),
    'primary-shades-12-p': whiteA(0.12),
    'primary-shades-30-p': whiteA(0.3),
    'secondary-shades-4-p': whiteA(0.04),
    'secondary-shades-18-p': whiteA(0.18)
  },
  primary: {
    main: '#66BBFF',
    dark: '#3A9AE8',
    light: '#E8F0FC',
    contrast: 'rgba(0,0,0,0.87)',
    'shades-hover': alpha('#8CB5F2', 0.08),
    'shades-select': alpha('#8CB5F2', 0.16),
    'shades-12-p': alpha('#8CB5F2', 0.12),
    'shades-30-p': alpha('#8CB5F2', 0.3),
    'shades-50-p': alpha('#8CB5F2', 0.5)
  },
  secondary: {
    main: '#FFCC80',
    dark: '#CA9B52',
    light: '#FFFFB0',
    contrast: 'rgba(0,0,0,0.87)',
    'shades-hover': alpha('#FFCC80', 0.08),
    'shades-select': alpha('#FFCC80', 0.16),
    'shades-12-p': alpha('#FFCC80', 0.12),
    'shades-30-p': alpha('#FFCC80', 0.3),
    'shades-50-p': alpha('#FFCC80', 0.5)
  },
  error: {
    main: '#F44336',
    dark: '#D32F2F',
    light: '#E57373',
    contrast: white,
    'shades-hover': alpha('#F44336', 0.08),
    'shades-select': alpha('#F44336', 0.16),
    'shades-12-p': alpha('#F44336', 0.12),
    'shades-30-p': alpha('#F44336', 0.3),
    'shades-50-p': alpha('#F44336', 0.5),
    ...darkStatusShades.error
  },
  warning: {
    main: '#FFA726',
    dark: '#F57C00',
    light: '#FFB74D',
    contrast: 'rgba(0,0,0,0.87)',
    'shades-hover': alpha('#FFA726', 0.08),
    'shades-select': alpha('#FFA726', 0.16),
    'shades-12-p': alpha('#FFA726', 0.12),
    'shades-30-p': alpha('#FFA726', 0.3),
    'shades-50-p': alpha('#FFA726', 0.5),
    ...darkStatusShades.warning
  },
  info: {
    main: '#29B6F6',
    dark: '#0288D1',
    light: '#4FC3F7',
    contrast: 'rgba(0,0,0,0.87)',
    'shades-hover': alpha('#29B6F6', 0.08),
    'shades-select': alpha('#29B6F6', 0.16),
    'shades-12-p': alpha('#29B6F6', 0.12),
    'shades-30-p': alpha('#29B6F6', 0.3),
    'shades-50-p': alpha('#29B6F6', 0.5),
    ...darkStatusShades.info
  },
  success: {
    main: '#66BB6A',
    dark: '#388E3C',
    light: '#81C784',
    contrast: 'rgba(0,0,0,0.87)',
    'shades-hover': alpha('#66BB6A', 0.08),
    'shades-select': alpha('#66BB6A', 0.16),
    'shades-12-p': alpha('#66BB6A', 0.12),
    'shades-30-p': alpha('#66BB6A', 0.3),
    'shades-50-p': alpha('#66BB6A', 0.5),
    ...darkStatusShades.success
  },
  action: {
    active: whiteA(0.64),
    hover: whiteA(0.08),
    selected: whiteA(0.16),
    disabled: whiteA(0.3),
    'disabled-background': whiteA(0.12),
    focus: whiteA(0.12)
  },
  background: {
    default: '#121212',
    'paper-elevation-0': '#121212',
    'paper-elevation-2': '#1B1B1B',
    'paper-elevation-8': '#252525',
    'paper-elevation-16': '#383838',
    'paper-elevation-24': '#4B4B4B'
  },
  other: {
    divider: whiteA(0.12),
    'outlined-border-23-p': whiteA(0.23),
    'filled-input-background': whiteA(0.09),
    'standard-input-line': whiteA(0.42),
    'backdrop-overlay': alpha(ink, 0.5),
    snackbar: '#323232',
    'rating-active': '#FFB400'
  },
  basic: { white, black: '#000000' }
};

// --- §2.7 Extended data-viz ramps ----------------------------------------
// Solid ramps only (the `-a` alpha variants are intentionally omitted; tokens
// can be added later if a data-viz surface needs them).
type Ramp = Record<'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900', string>;

const lightGrey: Ramp = {
  '50': '#FAFAFA', '100': '#F5F5F5', '200': '#EEEEEE', '300': '#E0E0E0', '400': '#BDBDBD',
  '500': '#9E9E9E', '600': '#757575', '700': '#616161', '800': '#424242', '900': '#212121'
};
const lightPurple: Ramp = {
  '50': '#F3E5F5', '100': '#E1BEE7', '200': '#CE93D8', '300': '#BA68C8', '400': '#AB47BC',
  '500': '#9C27B0', '600': '#8E24AA', '700': '#7B1FA2', '800': '#6A1B9A', '900': '#4A148C'
};
const lightLightBlue: Ramp = {
  '50': '#E1F5FE', '100': '#B3E5FC', '200': '#81D4FA', '300': '#4FC3F7', '400': '#29B6F6',
  '500': '#03A9F4', '600': '#039BE5', '700': '#0288D1', '800': '#0277BD', '900': '#01579B'
};
const lightYellow: Ramp = {
  '50': '#FFFDE7', '100': '#FFF9C4', '200': '#FFF59D', '300': '#FFF176', '400': '#FFEE58',
  '500': '#FFEB3B', '600': '#FDD835', '700': '#FBC02D', '800': '#F9A825', '900': '#F57F17'
};
// Spec §2.7 blue ramp is customized — blue.700 is #0057B2, not Material's #1976D2.
const lightBlue: Ramp = {
  '50': '#E3F2FD', '100': '#BBDEFB', '200': '#90CAF9', '300': '#64B5F6', '400': '#42A5F5',
  '500': '#2196F3', '600': '#1E88E5', '700': '#0057B2', '800': '#1565C0', '900': '#0D47A1'
};
const lightBlueGray: Ramp = {
  '50': '#ECEFF1', '100': '#CFD8DC', '200': '#B0BEC5', '300': '#90A4AE', '400': '#78909C',
  '500': '#607D8B', '600': '#546E7A', '700': '#455A64', '800': '#37474F', '900': '#263238'
};

// §2.7 — "In dark mode the code reverses each ramp (50↔900) automatically."
function reverseRamp(r: Ramp): Ramp {
  return {
    '50': r['900'], '100': r['800'], '200': r['700'], '300': r['600'], '400': r['500'],
    '500': r['400'], '600': r['300'], '700': r['200'], '800': r['100'], '900': r['50']
  };
}

const lightRamps = {
  grey: lightGrey,
  purple: lightPurple,
  'light-blue': lightLightBlue,
  yellow: lightYellow,
  // Spec §2.7 extra step `blue.70 = #0041B2` (custom token outside Material's 50–900 grid).
  blue: { ...lightBlue, '70': '#0041B2' } as Ramp & { '70': string },
  'blue-gray': lightBlueGray
};

const darkRamps = {
  grey: reverseRamp(lightGrey),
  purple: reverseRamp(lightPurple),
  'light-blue': reverseRamp(lightLightBlue),
  yellow: reverseRamp(lightYellow),
  blue: { ...reverseRamp(lightBlue), '70': '#0041B2' } as Ramp & { '70': string },
  'blue-gray': reverseRamp(lightBlueGray)
};

const lightFull = { ...lightColors, ramps: lightRamps };
const darkFull = { ...darkColors, ramps: darkRamps };

export function getColors(mode: ColorMode) {
  return mode === 'dark' ? darkFull : lightFull;
}

// --- CSS variable serializer ----------------------------------------------
// Walk the palette tree and emit `--<group>-<token>: <value>` so component
// authors can reach tokens without `getColors(mode)` in CSS-only contexts.
// e.g. `--primary-main`, `--text-secondary`, `--error-shades-190-p`,
// `--background-paper-elevation-2`, `--ramps-grey-100`.
function flattenForCss(node: unknown, prefix: string, out: Record<string, string>) {
  if (typeof node === 'string') {
    out[`--${prefix}`] = node;
    return;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      const key = prefix ? `${prefix}-${k}` : k;
      flattenForCss(v, key, out);
    }
  }
}

export function toCssVariables(mode: ColorMode): Record<string, string> {
  const out: Record<string, string> = {};
  flattenForCss(getColors(mode), '', out);
  return out;
}
