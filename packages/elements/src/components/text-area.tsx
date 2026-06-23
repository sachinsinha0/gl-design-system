import { Typography } from './typography';
import { ActionColorProps } from '..';
import { useFontByBreakpoint } from '../hooks';
import { GetProps, Stack, styled } from '@tamagui/core';
import React, { forwardRef } from 'react';
import { TextArea as TamaguiTextArea, TextAreaFrame } from 'tamagui';

export type TextAreaProps = Omit<GetProps<typeof TextAreaFrame>, 'startIcon' | 'endIcon'> & {
  helperText?: string;
  size?: 'small' | 'default';
  error?: boolean;
  disabled?: boolean;
  color?: ActionColorProps;
  height?: number;
  placeholderTextColor?: string;
};

function getVariantStyle(variant, { props, theme }) {
  if (!props.error && !props.disabled) {
    return {
      backgroundColor: '$surfaceContainerLowest',
      borderColor: theme['outline'],
      borderWidth: 1,
      hoverStyle: {
        backgroundColor: '$surfaceContainerLow',
        borderColor: theme[`${props.clr}`] || props.hoverStyle?.borderColor,
        color: '$onSurface'
      },
      focusStyle: {
        borderWidth: 2,
        backgroundColor: '$surfaceContainerLow',
        borderColor: theme[`${props.clr}`] || props.focusStyle?.borderColor,
        color: '$onSurface'
      },
      pressStyle: {
        borderWidth: 2,
        backgroundColor: '$surfaceContainerLow',
        borderColor: theme[`${props.clr}`] || props.focusStyle?.borderColor,
        color: '$onSurface'
      }
    };
  }
}

function getSizeStyle(val, { fonts, props }) {
  const font = fonts[useFontByBreakpoint('$body')];
  let size = '$4';

  if (val === 'small') {
    size = '$4';
  }

  const fontFamily = font.family;
  const lineHeight = props.lineHeight || font.lineHeight[size];
  const fontWeight = props.fontWeight || font.weight[size];
  const letterSpacing = props.letterSpacing || font.letterSpacing[size];
  const textTransform = props.textTransform || font.transform?.[size];

  return {
    textTransform,
    fontFamily,
    fontWeight,
    letterSpacing,
    fontSize: 16,
    lineHeight,
    minWidth: 140,
    height: props?.height || val === 'small' ? 40 : 56,
    paddingHorizontal: 12,
    paddingVertical: val === 'small' ? 8 : 16
  };
}

export const StyledTextAreaFrame = styled(TamaguiTextArea, {
  name: 'TextArea',
  borderRadius: '$true',
  color: '$onSurface',
  textAlignVertical: 'top',
  variants: {
    variant: {
      outlined: getVariantStyle
    },
    size: {
      default: getSizeStyle,
      small: getSizeStyle
    },
    error: {
      true: {
        backgroundColor: '$surfaceContainerLowest',
        borderColor: '$error',
        borderWidth: 2,
        hoverStyle: {
          backgroundColor: '$surfaceContainerLow',
          color: '$onSurface'
        },
        focusStyle: {
          backgroundColor: '$surfaceContainerLow',
          color: '$onSurface'
        },
        pressStyle: {
          backgroundColor: '$surfaceContainerLow',
          color: '$onSurface'
        }
      }
    },
    disabled: {
      true: {
        backgroundColor: '$surfaceContainerHighest',
        borderColor: '$outline',
        borderWidth: 1,
        pointerEvents: 'none',
        opacity: 0.5,
        hoverStyle: {
          color: '$onSurface'
        },
        focusStyle: {
          color: '$onSurface'
        },
        pressStyle: {
          color: '$onSurface'
        }
      }
    }
  } as const,

  defaultVariants: {
    variant: 'outlined',
    size: 'default'
  }
});

export const TextArea = forwardRef<any, TextAreaProps>(function TextArea(
  {
    children,
    helperText,
    color = 'primary',
    size = 'default',
    placeholderTextColor: placeholderTextColorProp,
    ...props
  },
  ref
) {
  const textColor = props.disabled ? '$onSurfaceVariant' : '$onSurface';
  const placeholderTextColor = placeholderTextColorProp || '$onSurfaceVariant';
  return (
    <Stack space="$xs">
      <Stack position="relative">
        <StyledTextAreaFrame
          editable={!props.disabled}
          placeholderTextColor={placeholderTextColor}
          unstyled
          clr={color}
          size={size}
          ref={ref}
          {...props}>
          {children}
        </StyledTextAreaFrame>
      </Stack>
      {helperText && (
        <Typography variant="caption1" color={props.error ? '$error' : textColor}>
          {helperText}
        </Typography>
      )}
    </Stack>
  );
});
