import { animations } from './animations';
import { themes } from './themes';
import { tokens } from './tokens';
import { fonts } from './fonts';
import { createTamagui } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { createMedia } from '@tamagui/react-native-media-driver';

const media = {
  xxs: { maxWidth: 1 - 1 },
  gtXXs: { minWidth: 1 },

  xs: { maxWidth: 360 - 1 },
  gtXs: { minWidth: 360 },

  sm: { maxWidth: 600 - 1},
  gtSm: { minWidth: 600  },

  md: { maxWidth: 768 - 1 },
  gtMd: { minWidth: 768 },

  tablet: { maxWidth: 1024 - 1 },
  gtTablet: { minWidth: 1024 },
  
  lg: { maxWidth: 1280 - 1 },
  gtLg: { minWidth: 1280 },

  xl: { maxWidth: 1536 - 1 },
  gtXl: { minWidth: 1536 },

  xxl: { maxWidth: 1920 - 1  },
  gtXXl: { minWidth: 1920 },
};

export type MediaType = keyof typeof media;

export const config = createTamagui({
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts,
  themes,
  tokens,
  media: createMedia(media)
});
