import { themeTokens } from './tokens';

// const blue_dark = createTheme(themeTokens.dark);
type BaseTheme = typeof themeTokens.dark;

const AppThemes = themeTokens;

export type GLTheme =
  | 'blue'
  | 'deeporange'
  | 'darkteal'
  | 'gold'
  | 'eggplant'
  | 'glapremium'
  | 'olive'
  | 'ocean'
  | 'stormblue'
  | 'ink'
  | 'midnight'
  | 'rust'
  | 'mint'
  | 'cyan'
  | 'deeppurple'
  | 'green'
  | 'lightblue'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'rose'
  | 'lime';

type Themes = {
  [key in keyof typeof AppThemes]: BaseTheme;
};

export const themes: Themes = AppThemes;
