import {
  getButtonFrame,
  getButtonFrameVariantStyle,
  getButtonStateFrameVariantStyle,
  getButtonStateFrame,
  getButtonTextFrameVariantStyle,
  ButtonProps
} from './button';
import { ActionColorProps, ActionSizeProps, Icon, useTheme } from '../';
import React, { ReactNode } from 'react';
import { AnchorProps } from 'tamagui/types';
import { Anchor } from 'tamagui';
import { Platform } from 'react-native';

function getButtonIconFrameSizeStyle(size) {
  switch (size) {
    case 'sm':
      return 24;
    case 'md':
    case 'lg':
      return 24;
    case 'xl':
      return 32;
    default:
      return 20;
  }
}

function getIconButtonStateFrameSizeStyle(val) {
  switch (val) {
    case 'sm':
      return {
        paddingHorizontal: 0,
        paddingVertical: 0
      };
    case 'md':
      return {
        paddingHorizontal: 4,
        paddingVertical: 3
      };
    case 'lg':
    case 'xl':
      return {
        paddingHorizontal: 8,
        paddingVertical: 7
      };
    default:
      return {
        paddingHorizontal: 4,
        paddingVertical: 3
      };
  }
}

const IconButtonFrame = getButtonFrame('IconButtonFrame', getButtonFrameVariantStyle);
const IconButtonStateFrame = getButtonStateFrame(
  'IconButtonStateFrame',
  getButtonStateFrameVariantStyle,
  getIconButtonStateFrameSizeStyle
);

export type IconButtonSizeProps = ActionSizeProps;
export type IconButtonColorProps = ActionColorProps;

export type IconButtonProps = {
  icon?: string | ReactNode;
  size?: IconButtonSizeProps;
  color?: IconButtonColorProps;
  iconColor?: IconButtonColorProps;
} & Omit<ButtonProps, 'size'> & Omit<AnchorProps, 'size'>;

export const IconButtonComponent = IconButtonFrame.extractable(
  ({
    color = 'primary',
    size = 'md',
    icon,
    variant = 'contained',
    iconColor,
    onPress,
    ...props
  }: IconButtonProps) => {
    const textColor = getButtonTextFrameVariantStyle(variant, {
      props: { clr: color, disabled: props.disabled },
      theme: useTheme()
    }).color;
    const sizeValue = getButtonIconFrameSizeStyle(size);

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      <IconButtonFrame {...props} clr={color} variant={variant}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <IconButtonStateFrame clr={color} size={size} variant={variant} onPress={onPress}>
          {icon && <Icon icon={icon} color={iconColor || textColor} size={sizeValue} />}
        </IconButtonStateFrame>
      </IconButtonFrame>
    );
  }
);

export const IconButton = ({ href, target, rel, disabled, ...props }: ButtonProps) => {
  if (href && Platform.OS === 'web') {
    return (
      <Anchor
        style={{ textDecoration: 'none', ...(disabled ? { pointerEvents: 'none' } : {}) }}
        href={href}
        target={target}
        ref={rel}>
        <IconButtonComponent disabled={disabled} {...props} />
      </Anchor>
    );
  } else {
    return <IconButtonComponent disabled={disabled} {...props} />;
  }
};
