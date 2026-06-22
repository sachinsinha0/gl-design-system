import {
  elevation2XLStyle,
  elevation3XLStyle,
  elevationLGStyle,
  elevationMDStyle,
  elevationSMStyle,
  elevationXLStyle,
  elevationXSStyle
} from '../css';
import { GetProps, Stack, styled } from '@tamagui/core';
import React from 'react';

export function mapSurfacePropsToColorTokens(surface: SurfaceType) {
  switch (surface) {
    case 'background':
      return '$background';
    case 'bright':
      return '$surfaceBright';
    case 'default':
      return '$surface';
    case 'dim':
      return '$surfaceDim';
    case 'inverse':
      return '$inverseSurface';
    case 'tint':
      return '$surfaceTint';
    case 'variant':
      return '$surfaceVariant';
    default:
      return '$surface';
  }
}

export function getElevationStyle(variant) {
  switch (variant) {
    case 'xs':
      return elevationXSStyle;
    case 'sm':
      return elevationSMStyle;
    case 'md':
      return elevationMDStyle;
    case 'lg':
      return elevationLGStyle;
    case 'xl':
      return elevationXLStyle;
    case '2xl':
      return elevation2XLStyle;
    case '3xl':
      return elevation3XLStyle;
    default:
      return { shadowOpacity: 0 };
  }
}

export const SurfaceFrame = styled(Stack, {
  name: 'Surface',
  variants: {
    shadow: {
      default: getElevationStyle,
      xs: getElevationStyle,
      sm: getElevationStyle,
      md: getElevationStyle,
      lg: getElevationStyle,
      xl: getElevationStyle,
      '2xl': getElevationStyle,
      '3xl': getElevationStyle
    },
    surface: {
      background: { backgroundColor: '$background' },
      default: { backgroundColor: '$surface' },
      variant: { backgroundColor: '$surfaceVariant' },
      inverse: { backgroundColor: '$inverseSurface' },
      tint: { backgroundColor: '$surfaceTint' },
      bright: { backgroundColor: '$surfaceBright' },
      dim: { backgroundColor: '$surfaceDim' }
    },
    outlined: {
      true: {
        borderColor: '$outline',
        borderWidth: 1
      }
    }
  },
  defaultVariants: {
    surface: 'default',
    outlined: false,
    shadow: 'default'
  }
});

export type SurfaceType =
  | 'background'
  | 'default'
  | 'variant'
  | 'inverse'
  | 'tint'
  | 'bright'
  | 'dim';
export type SurfaceFrameProps = GetProps<typeof SurfaceFrame>;

export const Surface = SurfaceFrame.extractable((props: SurfaceFrameProps) => {
  return <SurfaceFrame {...props} />;
});
