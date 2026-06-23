import {
  light,
  dark,
  common,
  custom_light,
  custom_dark,
  tones,
  light_deeporange,
  dark_deeporange,
  light_cyan,
  dark_cyan,
  light_deeppurple,
  dark_deeppurple,
  light_green,
  dark_green,
  light_lightblue,
  dark_lightblue,
  light_orange,
  dark_orange,
  light_pink,
  dark_pink,
  light_purple,
  dark_purple,
  light_rose,
  dark_rose,
  light_lime,
  dark_lime,
  dark_darkteal,
  light_darkteal,
  light_gold,
  dark_gold,
  light_eggplant,
  dark_eggplant,
  light_olive,
  dark_olive,
  light_ocean,
  dark_ocean,
  light_stormblue,
  dark_stormblue,
  light_ink,
  dark_ink,
  light_midnight,
  dark_midnight,
  light_rust,
  dark_rust,
  light_mint,
  dark_mint,
  light_glapremium,
  dark_glapremium
} from './colors';
import { Variable, createTokens } from '@tamagui/core';

// should roughly map to button/input etc height at each level
// fonts should match that height/lineHeight at each stop
// so these are really non-linear on purpose
// why?
//   - at sizes <1, used for fine grained things (borders, smallest paddingY)
//     - so smallest padY should be roughly 1-4px so it can join with lineHeight
//   - at sizes >=1, have to consider "pressability" (jumps up)
//   - after that it should go upwards somewhat naturally
//   - H1 / headings top out at 10 naturally, so after 10 we can go upwards faster
//  but also one more wrinkle...
//  space is used in conjunction with size
//  i'm setting space to generally just a fixed fraction of size (~1/3-2/3 still fine tuning)
export const size = {
  $xs: 4,
  $sm: 6,
  $md: 8,
  $lg: 12,
  $xl: 16,
  $0: 0,
  '$0.125': 1,
  '$0.25': 2,
  '$0.5': 4,
  '$0.75': 6,
  $1: 8,
  $true: 8,
  '$1.25': 10,
  '$1.5': 12,
  '$1.75': 14,
  $2: 16,
  '$2.5': 20,
  $3: 24,
  '$3.5': 28,
  $4: 32,
  '$4.5': 36,
  $5: 40,
  $6: 48,
  $7: 56,
  $8: 64,
  $9: 72,
  $10: 80,
  $11: 88,
  $12: 96,
  $13: 104,
  $14: 112,
  $15: 120,
  $16: 128,
  $17: 136,
  $18: 144,
  $19: 152,
  $20: 160
};

type SizeKeysIn = keyof typeof size;
type Sizes = {
  [Key in SizeKeysIn extends `$${infer Key}` ? Key : SizeKeysIn]: number;
};
type SizeKeys = `${keyof Sizes extends `${infer K}` ? K : never}`;

const spaces = Object.entries(size).map(([k, v]) => {
  return [k, sizeToSpace(v)];
});

// a bit odd but keeping backward compat for values >8 while fixing below
function sizeToSpace(v: number) {
  return v;
}

function postfixObjKeys<A extends { [key: string]: Variable<string> | string }, B extends string>(
  obj: A,
  postfix: B
): {
  [Key in `${keyof A extends string ? keyof A : never}${B}`]: Variable<string> | string;
} {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v])) as any;
}

const spacesNegative = spaces.map(([k, v]) => [`-${(k as string).slice(1)}`, -v]);

type SizeKeysWithNegatives = `-${SizeKeys extends `$${infer Key}` ? Key : SizeKeys}` | SizeKeys;

export const space: {
  [Key in SizeKeysWithNegatives]: Key extends keyof Sizes ? Sizes[Key] : number;
} = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative)
} as any;

export const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500
};

export const radius = {
  0: 0,
  0.5: 4,
  true: 8
};

export const themeTokens = {
  light: { ...light, ...custom_light },
  dark: { ...dark, ...custom_dark },
  light_blue: { ...light, ...custom_light },
  dark_blue: { ...dark, ...custom_dark },
  light_deeporange: { ...light_deeporange, ...custom_light },
  dark_deeporange: { ...dark_deeporange, ...custom_dark },
  light_darkteal: { ...light_darkteal, ...custom_light },
  dark_darkteal: { ...dark_darkteal, ...custom_dark },
  light_gold: { ...light_gold, ...custom_light },
  dark_gold: { ...dark_gold, ...custom_dark },
  light_eggplant: { ...light_eggplant, ...custom_light },
  dark_eggplant: { ...dark_eggplant, ...custom_dark },
  light_glapremium: { ...light_glapremium, ...custom_light },
  dark_glapremium: { ...dark_glapremium, ...custom_dark },
  light_olive: { ...light_olive, ...custom_light },
  dark_olive: { ...dark_olive, ...custom_dark },
  light_ocean: { ...light_ocean, ...custom_light },
  dark_ocean: { ...dark_ocean, ...custom_dark },
  light_stormblue: { ...light_stormblue, ...custom_light },
  dark_stormblue: { ...dark_stormblue, ...custom_dark },
  light_ink: { ...light_ink, ...custom_light },
  dark_ink: { ...dark_ink, ...custom_dark },
  light_midnight: { ...light_midnight, ...custom_light },
  dark_midnight: { ...dark_midnight, ...custom_dark },
  light_rust: { ...light_rust, ...custom_light },
  dark_rust: { ...dark_rust, ...custom_dark },
  light_mint: { ...light_mint, ...custom_light },
  dark_mint: { ...dark_mint, ...custom_dark },
  light_cyan: { ...light_cyan, ...custom_light },
  dark_cyan: { ...dark_cyan, ...custom_dark },
  light_deeppurple: { ...light_deeppurple, ...custom_light },
  dark_deeppurple: { ...dark_deeppurple, ...custom_dark },
  light_green: { ...light_green, ...custom_light },
  dark_green: { ...dark_green, ...custom_dark },
  light_lightblue: { ...light_lightblue, ...custom_light },
  dark_lightblue: { ...dark_lightblue, ...custom_dark },
  light_orange: { ...light_orange, ...custom_light },
  dark_orange: { ...dark_orange, ...custom_dark },
  light_pink: { ...light_pink, ...custom_light },
  dark_pink: { ...dark_pink, ...custom_dark },
  light_purple: { ...light_purple, ...custom_light },
  dark_purple: { ...dark_purple, ...custom_dark },
  light_rose: { ...light_rose, ...custom_light },
  dark_rose: { ...dark_rose, ...custom_dark },
  light_lime: { ...light_lime, ...custom_light },
  dark_lime: { ...dark_lime, ...custom_dark }
};

export const color = {
  ...common,
  ...tones
  // ...postfixObjKeys(light, 'BlueLight'),
  // ...postfixObjKeys(dark, 'BlueDark')
  // To support additional color theme
  // ...postfixObjKeys(light, 'YellowLight'),
  // ...postfixObjKeys(dark, 'YellowDark')
};

export const tokens = createTokens({
  color,
  radius,
  zIndex,
  space,
  size
});
