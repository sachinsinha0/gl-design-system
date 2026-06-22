/* eslint-disable prettier/prettier */
import { Typography, TypographyProps } from './typography';
import { Icon, IconProps } from './icon';
import { X } from '../icons';
import { ActionColorProps, ActionSizeProps } from '../types';
import React, { ReactNode } from 'react';
import { GetProps, styled, useTheme } from '@tamagui/core';
import { XStack, Stack } from 'tamagui';
import pascalcase from 'pascalcase';

export function getChipStateFrameVariantStyle(variant, { props, theme }) {
  if (!props.disabled) {
    let style = {
      borderWidth: 1,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      cursor: props.onPress ? 'pointer' : 'default',
      ...(props.onPress && {
        hoverStyle: {
          backgroundColor:
            props.hoverStyle?.backgroundColor ||
            (props.clr === 'default' ? '$onSurfaceOpacity8P' : '$onPrimaryOpacity8P')
        },
        pressStyle: {
          backgroundColor:
            props.pressStyle?.backgroundColor ||
            (props.clr === 'default' ? '$onSurfaceOpacity16P' : '$onPrimaryOpacity16P')
        }
      })
    };

    if (variant === 'outlined') {
      style = {
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        cursor: props.onPress ? 'pointer' : 'default',
        ...(props.onPress && {
          hoverStyle: {
            backgroundColor: 'transparent',
            borderColor: 'transparent'
          },
          pressStyle: {
            backgroundColor:
              props.clr === 'default' ? '$onSurfaceOpacity16P' : '$onPrimaryOpacity16P'
          }
        })
      };
    }

    return style;
  }
}

export function getChipFrameVariantStyle(variant, { props, theme }) {
  if (!props.disabled) {
    let style = {
      borderWidth: 0,
      backgroundColor: props.backgroundColor || theme[props.clr] || '$surfaceContainer',
      borderColor: 'transparent'
    };

    if (variant === 'outlined') {
      style = {
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: props.borderColor || theme[props.clr] || '$onSurfaceVariant',
        ...(props.isClickable && {
        hoverStyle: {
          backgroundColor:
            props.hoverStyle?.backgroundColor ||
            theme[`${props.clr}Container`] ||
            '$onSurfaceOpacity8P'
        },
        pressStyle: {
          backgroundColor:
            props.pressStyle?.backgroundColor ||
            theme[`${props.clr}Container`] ||
            '$onSurfaceOpacity8P'
        }})
      };
    }

    return style;
  }
}

export const ChipStateFrame = styled(XStack, {
  name: 'ChipStateFrame',
  paddingHorizontal: 12,
  flex: 1,
  backgroundColor: 'red',
  alignItems: 'center',
  borderRadius: '$true',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
  variants: {
    variant: {
      filled: getChipStateFrameVariantStyle,
      outlined: getChipStateFrameVariantStyle
    },
    size: {
      sm: {
        height: 24
      },
      md: {
        height: 32
      }
    },
    clr: {
      ':string': {}
    }
  } as const,
  defaultVariants: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    variant: 'filled'
  }
});

export const ChipFrame = styled(Stack, {
  name: 'ChipFrame',
  borderRadius: '$true',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  variants: {
    variant: {
      filled: getChipFrameVariantStyle,
      outlined: getChipFrameVariantStyle
    },
    size: {
      sm: {
        height: 24
      },
      md: {
        height: 32
      }
    },
    clr: {
      ':string': {}
    }
  } as const,
  defaultVariants: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    variant: 'filled',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    size: 'md'
  }
});

// export const MCIconFrame = styled(MCRNIcon, style, { isReactNative: true });

export type ChipColorProps = ActionColorProps;
export type ChipSizeProps = Omit<ActionSizeProps, 'lg' | 'xl'> | number;

export type ChipProps = Omit<GetProps<typeof ChipStateFrame>, 'clr'> & {
  color?: ChipColorProps;
  label?: string;
  labelVariant?: string;
  labelProps?: TypographyProps;
  size?: ChipSizeProps;
  icon?: ReactNode;
  deleteIcon?: ReactNode;
  onDelete?: () => void;
  variant?: string;
};

export const Chip = ChipStateFrame.extractable(
  ({
    color = 'default',
    label,
    labelVariant = 'caption1',
    labelProps,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    deleteIcon = X,
    onDelete,
    onPress,
    icon,
    ...props
  }: ChipProps) => {
    const theme = useTheme();
    const textColor =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      props.variant === 'outlined'
        ? theme[`${color}`] || '$onSurfaceVariant'
        : theme[`on${pascalcase(color)}`] || '$onSurface';
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      <ChipFrame {...props} clr={color} isClickable={!!onPress}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <ChipStateFrame {...props} onPress={onPress} clr={color}>
          {icon && <Icon icon={icon} size={16} color={textColor} marginRight="$0.5" />}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Typography variant={labelVariant} color={textColor} userSelect="none" {...labelProps}>
            {label}
          </Typography>
          {onDelete && (
            <Icon
              onPress={(e) => {
                onDelete();
                e.stopPropagation();
              }}
              icon={deleteIcon}
              size={16}
              color={textColor}
              marginLeft="$0.5"
            />
          )}
        </ChipStateFrame>
      </ChipFrame>
    );
  }
);
