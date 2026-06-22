import { Typography } from './typography';
import { ActionColorProps, Icon } from '../';
import { useFontByBreakpoint } from '../hooks';
import { GetProps, Stack, styled } from '@tamagui/core';
import React, { ReactNode, memo } from 'react';
import { Input } from 'tamagui';

export type TextFieldProps = Omit<GetProps<typeof TextFieldFrame>, 'startIcon' | 'endIcon'> & {
  helperText?: string;
  size?: 'small' | 'default';
  error?: boolean;
  disabled?: boolean;
  color?: ActionColorProps;
  startIcon?: string | ReactNode;
  startIconPress?: () => any;
  endIconPress?: () => any;
  endIcon?: string | ReactNode;
  placeholderTextColor?: string;
};

type IconProps = TextFieldProps & { textColor: string };

const iconSize = {
  small: 24,
  default: 24
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
  let size = '$body1';

  if (val === 'small') {
    size = '$body2';
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
    height: val === 'small' ? 40 : 56,
    paddingHorizontal: 12,
    paddingVertical: val === 'small' ? 8 : 16
  };
}

function StartIcon({ startIconPress, startIcon, size, textColor }: IconProps) {
  return (
    <Stack
      cursor={startIconPress && 'pointer'}
      onPress={startIconPress}
      zIndex={1}
      position="absolute"
      left={12}
      top={size === 'small' ? 8 : 16}>
      <Icon icon={startIcon} size={iconSize[size]} color={textColor} />
    </Stack>
  );
}

const MemoizedStartIcon = memo(StartIcon);

function EndIcon({ endIconPress, endIcon, size, textColor }: IconProps) {
  return (
    <Stack
      cursor={endIconPress && 'pointer'}
      onPress={endIconPress}
      zIndex={1}
      position="absolute"
      right={12}
      top={size === 'small' ? 8 : 16}>
      <Icon icon={endIcon} size={iconSize[size]} color={textColor} />
    </Stack>
  );
}
const MemoizedEndIcon = memo(EndIcon);

export const TextFieldFrame = styled(Input, {
  name: 'TextField',
  borderRadius: '$true',
  color: '$onSurface',
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
    },
    startIcon: {
      true: (val, { props }) => {
        return {
          paddingLeft: 12 + (props.paddingLeft || iconSize[props.size]) + 8
        };
      }
    },
    endIcon: {
      true: (val, { props }) => {
        return {
          paddingRight: 12 + (props.paddingRight || iconSize[props.size]) + 8
        };
      }
    }
  } as const,

  defaultVariants: {
    variant: 'outlined',
    size: 'default'
  }
});

export const TextField = React.forwardRef(function TextField(
  {
    children,
    helperText,
    color = 'primary',
    startIcon,
    endIcon,
    size = 'default',
    startIconPress,
    endIconPress,
    placeholderTextColor: placeholderTextColorProp,
    ...props
  }: TextFieldProps,
  ref
) {
  const textColor = props.disabled ? '$onSurfaceVariant' : '$onSurface';
  const placeholderTextColor = placeholderTextColorProp || '$onSurfaceVariant';
  return (
    <Stack space={'$xs'}>
      <Stack position="relative">
        {startIcon && (
          <MemoizedStartIcon
            startIconPress={startIconPress}
            startIcon={startIcon}
            size={size}
            textColor={textColor}
          />
        )}
        <TextFieldFrame
          ref={ref}
          editable={!props.disabled}
          placeholderTextColor={placeholderTextColor}
          unstyled
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          clr={color}
          size={size}
          startIcon={!!startIcon}
          endIcon={!!endIcon}
          {...props}>
          {children}
        </TextFieldFrame>
        {endIcon && (
          <MemoizedEndIcon
            endIconPress={endIconPress}
            endIcon={endIcon}
            size={size}
            textColor={textColor}
          />
        )}
      </Stack>
      {helperText && (
        <Typography variant="caption1" color={props.error ? '$error' : textColor}>
          {helperText}
        </Typography>
      )}
    </Stack>
  );
});
