import { getElevationStyle } from './surface';
import { GetProps, Stack, styled } from '@tamagui/core';
import React from 'react';

export const ContainerFrame = styled(Stack, {
  name: 'ContainerFrame',
  borderRadius: '$true',
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
    container: {
      lowest: { backgroundColor: '$surfaceContainerLowest' },
      low: { backgroundColor: '$surfaceContainerLow' },
      default: { backgroundColor: '$surfaceContainer' },
      high: { backgroundColor: '$surfaceContainerHigh' },
      highest: { backgroundColor: '$surfaceContainerHighest' }
    },
    outlined: {
      true: {
        borderColor: '$outlineVariant',
        borderWidth: 1
      }
    }
  },
  defaultVariants: {
    container: 'default',
    outlined: false,
    shadow: 'default'
  }
});

export type ContainerProps = GetProps<typeof ContainerFrame>;
export type ContainerType = 'lowest' | 'low' | 'default' | 'high' | 'highest';

export const Container = ContainerFrame.extractable(
  React.forwardRef<any, ContainerProps>((props, ref) => {
    return <ContainerFrame ref={ref} {...props} />;
  })
);
