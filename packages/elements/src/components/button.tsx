import { Icon } from './icon';
import { ActionColorProps, ActionSizeProps, useColorValue } from '../';
import { pascalcase } from 'pascalcase';
import React, { ReactNode } from 'react';

import { GetProps, Stack, styled, Text, useTheme } from '@tamagui/core';
import { Platform } from 'react-native';
import { Anchor } from 'tamagui';
import { AnchorProps } from 'tamagui/types';

export function getButtonFrameVariantStyle(variant, { props, theme }) {
  if (!props.disabled) {
    let style = {
      borderWidth: 0,
      backgroundColor: theme[`${props.clr}`] || props.clr,
      borderColor: 'transparent'
    };

    if (variant === 'outlined') {
      style = {
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: theme[`outlineVariant`] || props.clr
      };
    }

    if (variant === 'tonal') {
      style = {
        borderWidth: 0,
        backgroundColor: theme[`${props.clr}Container`],
        borderColor: 'transparent'
      };
    }

    if (variant === 'text') {
      style = {
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: 'transparent'
      };
    }
    return style;
  }
}

export function getButtonStateFrameVariantStyle(variant, { props, theme }) {
  if (!props.disabled) {
    let style = {
      borderWidth: 1,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: props.padding,
      hoverStyle: {
        backgroundColor:
          props.hoverStyle?.backgroundColor || theme[`on${pascalcase(props.clr)}Opacity8P`],
        borderColor: props.hoverStyle?.borderColor || theme[`on${pascalcase(props.clr)}Opacity8P`]
      },
      pressStyle: {
        backgroundColor:
          props.pressStyle?.backgroundColor || theme[`on${pascalcase(props.clr)}Opacity16P`],
        borderColor: props.pressStyle?.borderColor || theme[`on${pascalcase(props.clr)}Opacity16P`]
      }
    };

    if (variant === 'outlined') {
      style = {
        ...style,
        borderWidth: 0,
        hoverStyle: {
          backgroundColor: props.hoverStyle?.backgroundColor || theme[`${props.clr}Opacity16P`],
          borderColor: props.hoverStyle?.borderColor || theme[`${props.clr}Opacity16P`]
        },
        pressStyle: {
          backgroundColor:
            props.pressStyle?.backgroundColor ||
            theme[`on${pascalcase(props.clr)}ContainerOpacity16P`],
          borderColor: 'transparent'
        }
      };
    }

    if (variant === 'tonal') {
      style = {
        ...style,
        borderWidth: 0,
        hoverStyle: {
          backgroundColor: props.hoverStyle?.backgroundColor || theme[`${props.clr}Opacity16P`],
          borderColor:
            props.pressStyle?.borderColor || theme[`on${pascalcase(props.clr)}Opacity16P`]
        },
        pressStyle: {
          backgroundColor: props.pressStyle?.backgroundColor || theme[`${props.clr}Opacity16P`],
          borderColor:
            props.pressStyle?.borderColor || theme[`on${pascalcase(props.clr)}Opacity16P`]
        }
      };
    }

    if (variant === 'text') {
      style = {
        ...style,
        borderWidth: 1,
        hoverStyle: {
          backgroundColor: props.hoverStyle?.backgroundColor || theme[`${props.clr}Opacity8P`],
          borderColor: 'transparent'
        },
        pressStyle: {
          backgroundColor: props.pressStyle?.backgroundColor || theme[`${props.clr}Opacity16P`],
          borderColor: 'transparent'
        }
      };
    }
    return style;
  }
}

export function getButtonFrameDisabledStyle(val, { props }) {
  let style = {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: '$onSurfaceOpacity8P',
    pointerEvents: 'none'
  };

  if (props.variant === 'outlined') {
    style = {
      borderWidth: 1,
      borderColor: '$outlineVariant',
      backgroundColor: 'transparent',
      pointerEvents: 'none'
    };
  }

  if (props.variant === 'tonal') {
    style = {
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: 'onSurfaceOpacity8P',
      pointerEvents: 'none'
    };
  }

  if (props.variant === 'text') {
    style = {
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      pointerEvents: 'none'
    };
  }
  return style;
}

export function getButtonStateFrameDisabledStyle(val, { props }) {
  let style = {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '$onSurfaceOpacity8P',
    pointerEvents: 'none'
  };

  if (props.variant === 'outlined') {
    style = {
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: '$onSurfaceOpacity8P',
      pointerEvents: 'none'
    };
  }

  if (props.variant === 'tonal') {
    style = {
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: '$onSurfaceOpacity8P',
      pointerEvents: 'none'
    };
  }

  if (props.variant === 'text') {
    style = {
      borderWidth: 1,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      pointerEvents: 'none'
    };
  }
  return style;
}

export function getRNVIButtonIconFrameSizeStyle(size: ButtonSizeProps) {
  switch (size) {
    case 'sm':
      return 16;
    case 'md':
      return 20;
    case 'lg':
    case 'xl':
      return 24;
    default:
      return 20;
  }
}

function getButtonStateFrameSizeStyle(val) {
  switch (val) {
    case 'sm':
      return {
        paddingHorizontal: 11,
        paddingVertical: 3
      };
    case 'md':
      return {
        paddingHorizontal: 14,
        paddingVertical: 5
      };
    case 'lg':
      return {
        paddingHorizontal: 19,
        paddingVertical: 7
      };
    case 'xl':
      return {
        paddingHorizontal: 24,
        paddingVertical: 11
      };
    default:
      return {
        paddingHorizontal: 14,
        paddingVertical: 5
      };
  }
}

export function getButtonTextFrameVariantStyle(val, { props, theme }) {
  return {
    opacity: props.disabled ? 0.5 : 1,
    color:
      (props.disabled
        ? theme['onSurfaceVariant']
        : val === 'contained'
        ? theme[`on${pascalcase(props.clr)}`]
        : theme[`${props.clr}`]) || props.clr
  };
}

function getButtonTextFrameSizeStyle(val, { fonts, props }) {
  const size = `$${val}`;
  const font = fonts['$button'];
  const fontFamily = font.family;
  const fontSize = props.fontSize || font.size[size];
  const lineHeight = props.lineHeight || font.lineHeight[size];
  const fontWeight = props.fontWeight || font.weight[size];
  const letterSpacing = props.letterSpacing || font.letterSpacing[size];
  const textTransform = props.textTransform || font.transform?.[size];
  return {
    textTransform,
    fontFamily,
    fontWeight,
    letterSpacing,
    fontSize,
    lineHeight
  };
}

function getButtonIconFrameVariantStyle(val, { props, theme }) {
  return {
    opacity: props.disabled ? 0.5 : 1,
    color: props.disabled
      ? theme['onSurface']
      : props.textColor ||
        (val === 'contained' ? theme[`on${pascalcase(props.clr)}`] : theme[`${props.clr}`])
  };
}

function getButtonIconFrameSizeStyle(val, { props }) {
  const marginKey = props.endIcon ? 'marginLeft' : 'marginRight';
  const marginValue = val === 'sm' ? 4 : 8;
  return {
    [marginKey]: marginValue
  };
}

export function getButtonFrame(name, getBFVariantStyle = getButtonFrameVariantStyle) {
  return styled(Stack, {
    name,
    borderRadius: '$true',
    flexWrap: 'nowrap',
    cursor: 'pointer',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    variants: {
      variant: {
        contained: getBFVariantStyle,
        outlined: getBFVariantStyle,
        tonal: getBFVariantStyle,
        text: getBFVariantStyle
      },
      disabled: {
        true: getButtonFrameDisabledStyle
      },
      clr: {
        ':string': {}
      }
    } as const,
    defaultVariants: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      variant: 'contained',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      clr: 'primary'
    }
  });
}

export function getButtonStateFrame(
  name,
  getBSFtateVariantStyle = getButtonStateFrameVariantStyle,
  getBSFSizeStyle = getButtonStateFrameSizeStyle
) {
  return styled(Stack, {
    name,
    borderRadius: '$true',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    cursor: 'pointer',
    alignSelf: 'stretch',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    variants: {
      variant: {
        contained: getBSFtateVariantStyle,
        outlined: getBSFtateVariantStyle,
        tonal: getBSFtateVariantStyle,
        text: getBSFtateVariantStyle
      },
      size: {
        sm: getBSFSizeStyle,
        md: getBSFSizeStyle,
        lg: getBSFSizeStyle,
        xl: getBSFSizeStyle
      },
      disabled: {
        true: getButtonStateFrameDisabledStyle
      },
      clr: {
        ':string': {}
      }
    } as const,
    defaultVariants: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      variant: 'contained',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      size: 'md',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      clr: 'primary'
    }
  });
}

export const ButtonStateFrame = getButtonStateFrame('ButtonStateFrame');
export const ButtonFrame = getButtonFrame('ButtonFrame');
const ButtonTextFrame = styled(
  Text,
  {
    name: 'ButtonTextFrame',
    textTransform: 'capitalize',
    userSelect: 'none',
    cursor: 'pointer',
    // flexGrow 1 leads to inconsistent native style where text pushes to start of view
    flexGrow: 0,
    flexShrink: 1,
    ellipse: true,
    display: 'flex',
    alignItems: 'center',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    variants: {
      variant: {
        contained: getButtonTextFrameVariantStyle,
        outlined: getButtonTextFrameVariantStyle,
        tonal: getButtonTextFrameVariantStyle,
        text: getButtonTextFrameVariantStyle
      },
      size: {
        sm: getButtonTextFrameSizeStyle,
        md: getButtonTextFrameSizeStyle,
        lg: getButtonTextFrameSizeStyle,
        xl: getButtonTextFrameSizeStyle
      },
      clr: {
        ':string': {}
      },
      textColor: {
        ':string': (val) => {
          return {
            color: useColorValue(val)
          };
        }
      }
    } as const,
    defaultVariants: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      variant: 'contained',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      size: 'md'
    }
  },
  { isText: true }
);
export const ButtonIconFrame = styled(Stack, {
  name: 'ButtonIconFrame',
  cursor: 'pointer',
  alignItems: 'center',
  variants: {
    btnSize: {
      sm: getButtonIconFrameSizeStyle,
      md: getButtonIconFrameSizeStyle,
      lg: getButtonIconFrameSizeStyle,
      xl: getButtonIconFrameSizeStyle
    },
    endIcon: {
      true: {}
    },
    isIconButton: {
      true: {
        margin: 0
      }
    }
  } as const,
  defaultVariants: {
    btnSize: 'md',
    endIcon: false
  }
});

export type ButtonColorProps = ActionColorProps;
export type ButtonSizeProps = ActionSizeProps;
export type ButtonProps = GetProps<typeof ButtonTextFrame> &
  GetProps<typeof ButtonFrame> & {
    startIcon?: string | ReactNode;
    endIcon?: string | ReactNode;
    size?: ButtonSizeProps;
    color?: ButtonColorProps;
    variant?: 'contained' | 'outlined' | 'text' | 'tonal';
    textColor?: string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  } & Omit<AnchorProps, 'size'>;

export const ButtonComponent = ButtonFrame.extractable(
  ({
    children,
    color = 'primary',
    size = 'md',
    variant = 'contained',
    startIcon,
    textColor: textColorProp,
    textTransform = 'capitalize',
    endIcon,
    onPress,
    ...props
  }: Omit<ButtonProps, 'href'>) => {
    const textColor =
      textColorProp ||
      getButtonTextFrameVariantStyle(variant, {
        props: { clr: color, disabled: props.disabled },
        theme: useTheme()
      }).color;
    const sizeValue = getRNVIButtonIconFrameSizeStyle(size);

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      <ButtonFrame {...props} clr={color} size={size} variant={variant}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <ButtonStateFrame {...props} clr={color} size={size} variant={variant} onPress={onPress}>
          {startIcon && (
            <ButtonIconFrame btnSize={size}>
              <Icon icon={startIcon} size={sizeValue} color={textColor} />
            </ButtonIconFrame>
          )}
          <ButtonTextFrame
            disabled={props.disabled}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            variant={variant}
            {...(typeof textColor === 'string' && { textColor: textColor })}
            // textColor={textColor}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            clr={color}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            size={size}
            alignItems="center"
            textTransform={textTransform}>
            {children}
          </ButtonTextFrame>
          {endIcon && (
            <ButtonIconFrame btnSize={size} endIcon={true}>
              <Icon icon={endIcon} size={sizeValue} color={textColor} />
            </ButtonIconFrame>
          )}
        </ButtonStateFrame>
      </ButtonFrame>
    );
  }
);

export const Button = ({ href, target, rel, disabled, ...props }: ButtonProps) => {
  if (href && Platform.OS === 'web') {
    return (
      <Anchor
        style={{ textDecoration: 'none', ...(disabled ? { pointerEvents: 'none' } : {}) }}
        href={href}
        target={target}
        ref={rel}>
        <ButtonComponent disabled={disabled} {...props} />
      </Anchor>
    );
  } else {
    return <ButtonComponent disabled={disabled} {...props} />;
  }
};
