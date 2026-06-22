import { createFont } from '@tamagui/core';
import { Platform } from 'react-native';

const heading = createFont({
  family: 'Inter',
  size: {
    h1: 26,
    h2: 24,
    h3: 22,
    h4: 20,
    h5: 18
  },
  weight: {
    h1: '600',
    h2: '600',
    h3: '600',
    h4: '600',
    h5: '600'
  },
  color: {
    h1: '$onSurface',
    h2: '$onSurface',
    h3: '$onSurface',
    h4: '$onSurface',
    h5: '$onSurface'
  },
  letterSpacing: {
    h1: -0.4,
    h2: -0.4,
    h3: -0.4,
    h4: -0.4,
    h5: -0.4
  },
  lineHeight: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 24,
    h5: 24
  },
  ...Platform.select({
    web: {
      face: {
        600: { normal: 'Inter' }
      }
    }
  })
});

const body = createFont({
  family: 'Inter',
  size: {
    body1: 16,
    body2: 14
  },
  weight: {
    body1: '400',
    body2: '400'
  },
  color: {
    body1: '$onSurfaceVariant',
    body2: '$onSurfaceVariant'
  },
  letterSpacing: {
    body1: 0,
    body2: 0
  },
  lineHeight: {
    body1: 20,
    body2: 20
  },
  ...Platform.select({
    web: {
      face: {
        400: { normal: 'Inter' }
      }
    }
  })
});

const subtitle = createFont({
  family: 'Inter',
  size: {
    subtitle1: 16,
    subtitle2: 14
  },
  weight: {
    subtitle1: '500',
    subtitle2: '500'
  },
  color: {
    subtitle1: '$onSurface',
    subtitle2: '$onSurface'
  },
  letterSpacing: {
    subtitle1: 0,
    subtitle2: 0
  },
  lineHeight: {
    subtitle1: 24,
    subtitle2: 20
  },
  ...Platform.select({
    web: {
      face: {
        500: { normal: 'Inter' }
      }
    }
  })
});

const caption = createFont({
  family: 'Inter',
  size: {
    caption1: 12,
    caption2: 10
  },
  weight: {
    caption1: '400',
    caption2: '400'
  },
  color: {
    caption1: '$onSurfaceVariant',
    caption2: '$onSurfaceVariant'
  },
  letterSpacing: {
    caption1: -0.2,
    caption2: -0.2
  },
  lineHeight: {
    caption1: 16,
    caption2: 16
  },
  ...Platform.select({
    web: {
      face: {
        400: { normal: 'Inter' }
      }
    }
  })
});

const overline = createFont({
  family: 'Inter',
  size: {
    overline: 10
  },
  transform: {
    overline: 'uppercase'
  },
  weight: {
    overline: '600'
  },
  color: {
    overline: '$onSurface'
  },
  letterSpacing: {
    // OnePlus fix: Reduce letter spacing on Android to prevent text truncation after spaces
    overline: Platform.OS === 'android' ? 1.1 : 1.2
  },
  lineHeight: {
    overline: 16
  },
  ...Platform.select({
    web: {
      face: {
        600: { normal: 'Inter' }
      }
    }
  })
});

const button = createFont({
  family: 'Inter',
  size: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 16
  },
  weight: {
    sm: '500',
    md: '500',
    lg: '500',
    xl: '500'
  },
  letterSpacing: {
    sm: 0.4,
    md: 0.4,
    lg: 0.4,
    xl: 0.4
  },
  lineHeight: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 24
  },
  ...Platform.select({
    web: {
      face: {
        500: { normal: 'Inter' }
      }
    }
  })
});

const headingDesktop = createFont({
  family: 'Inter',
  size: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18
  },
  weight: {
    h1: '600',
    h2: '600',
    h3: '600',
    h4: '600',
    h5: '600'
  },
  color: {
    h1: '$onSurface',
    h2: '$onSurface',
    h3: '$onSurface',
    h4: '$onSurface',
    h5: '$onSurface'
  },
  letterSpacing: {
    h1: -0.4,
    h2: -0.4,
    h3: -0.4,
    h4: -0.4,
    h5: -0.4
  },
  lineHeight: {
    h1: 36,
    h2: 32,
    h3: 28,
    h4: 24,
    h5: 24
  },
  ...Platform.select({
    web: {
      face: {
        600: { normal: 'Inter' }
      }
    }
  })
});

const bodyDesktop = createFont({
  family: 'Inter',
  size: {
    body1: 16,
    body2: 14
  },
  weight: {
    body1: '400',
    body2: '400'
  },
  color: {
    body1: '$onSurfaceVariant',
    body2: '$onSurfaceVariant'
  },
  letterSpacing: {
    body1: 0,
    body2: 0
  },
  lineHeight: {
    body1: 24,
    body2: 20
  },
  ...Platform.select({
    web: {
      face: {
        400: { normal: 'Inter' }
      }
    }
  })
});

const subtitleDesktop = createFont({
  family: 'Inter',
  size: {
    subtitle1: 16,
    subtitle2: 14
  },
  weight: {
    subtitle1: '500',
    subtitle2: '500'
  },
  color: {
    subtitle1: '$onSurface',
    subtitle2: '$onSurface'
  },
  letterSpacing: {
    subtitle1: 0,
    subtitle2: 0
  },
  lineHeight: {
    subtitle1: 28,
    subtitle2: 24
  },
  ...Platform.select({
    web: {
      face: {
        500: { normal: 'Inter' }
      }
    }
  })
});

const captionDesktop = createFont({
  family: 'Inter',
  size: {
    caption1: 12,
    caption2: 12
  },
  weight: {
    caption1: '400',
    caption2: '400'
  },
  color: {
    caption1: '$onSurfaceVariant',
    caption2: '$onSurfaceVariant'
  },
  letterSpacing: {
    caption1: -0.2,
    caption2: -0.2
  },
  lineHeight: {
    caption1: 16,
    caption2: 16
  },
  ...Platform.select({
    web: {
      face: {
        400: { normal: 'Inter' }
      }
    }
  })
});

const overlineDesktop = createFont({
  family: 'Inter',
  size: {
    overline: 10
  },
  transform: {
    overline: 'uppercase'
  },
  weight: {
    overline: '600'
  },
  color: {
    overline: '$onSurface'
  },
  letterSpacing: {
    overline: 1.2
  },
  lineHeight: {
    overline: 16
  },
  ...Platform.select({
    web: {
      face: {
        600: { normal: 'Inter' }
      }
    }
  })
});

const buttonDesktop = createFont({
  family: 'Inter',
  size: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 16
  },
  weight: {
    sm: '500',
    md: '500',
    lg: '500',
    xl: '500'
  },
  letterSpacing: {
    sm: 0.4,
    md: 0.4,
    lg: 0.4,
    xl: 0.4
  },
  lineHeight: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 24
  },
  ...Platform.select({
    web: {
      face: {
        500: { normal: 'Inter' }
      }
    }
  })
});

export const fonts = {
  heading,
  body,
  subtitle,
  caption,
  overline,
  button,
  headingDesktop,
  bodyDesktop,
  subtitleDesktop,
  captionDesktop,
  overlineDesktop,
  buttonDesktop
};
