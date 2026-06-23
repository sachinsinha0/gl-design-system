import { Check } from '../icons';
import { ActionColorProps, ActionSizeProps, Icon, Typography, TypographyProps } from '../';
import { useTokenValue } from '../hooks';
import { GetProps, Stack, styled, withStaticProperties } from '@tamagui/core';
import React, { ReactNode } from 'react';
import { Checkbox as TMCheckbox, ThemeableStack, useControllableState, XStack } from 'tamagui';

const sizeMapping = {
  xs: '$2',
  sm: '$2.5',
  md: '$3'
};

const iconSizeMapping = {
  xs: '$1.5',
  sm: '$2',
  md: '$2.5'
};

function getCheckboxFrameSizeStyle(val, { props }) {
  return {
    width: sizeMapping[props.checkboxSize] || props.checkboxSize,
    height: sizeMapping[props.checkboxSize] || props.checkboxSize
  };
}

function getCheckboxFrameColorStyle(val, { props, theme }) {
  const backgroundColor = theme[`${val}`] || '$onSurface';
  return {
    backgroundColor: props.checked
      ? props.disabled
        ? '$onSurfaceOpacity12P'
        : backgroundColor
      : 'transparent',
    borderWidth: props.error ? 2 : props.checked ? 0 : 1,
    borderColor: props.disabled
      ? '$onSurfaceOpacity16P'
      : props.error
      ? '$error'
      : props.checked
      ? backgroundColor
      : '$outline'
  };
}

function getCheckboxStateFrameColorStyle(val, { theme, props }) {
  return {
    hoverStyle: {
      backgroundColor: theme[`${val}Opacity8P`],
      ...props.hoverStyle
    },
    pressStyle: {
      backgroundColor: theme[`${val}Opacity12P`],
      ...props.pressStyle
    }
  };
}

export const CheckboxFrame = styled(TMCheckbox, {
  name: 'CheckboxFrame',
  borderRadius: '$0.5',
  borderWidth: 0,
  alignItems: 'center',
  justifyContent: 'center',
  variants: {
    clr: {
      ':string': getCheckboxFrameColorStyle
    },
    checkboxSize: {
      ':string': getCheckboxFrameSizeStyle,
      ':number': (val) => {
        return {
          width: val,
          height: val
        };
      }
    },
    disabled: {
      true: () => {
        return { pointerEvents: 'none', borderColor: '$onSurfaceOpacity16P' };
      }
    }
  } as const,
  defaultVariants: {
    clr: 'primary',
    checkboxSize: 'md',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    error: false
  }
});

export const CheckboxStateFrame = styled(ThemeableStack, {
  name: 'CheckboxStateFrame',
  borderRadius: '$0.5',
  left: '$-1',
  right: '$-1',
  top: '$-1',
  bottom: '$-1',
  position: 'absolute',
  cursor: 'pointer',
  variants: {
    clr: {
      ':string': getCheckboxStateFrameColorStyle
    }
  } as const,
  defaultVariants: {
    clr: 'primary'
  }
});

export type CheckboxColorProps = ActionColorProps;
export type CheckboxSizeProps = Omit<ActionSizeProps, 'lg' | 'xl'>;

export type CheckboxProps = Omit<GetProps<typeof CheckboxFrame>, 'size'> & {
  color?: CheckboxColorProps;
  size?: CheckboxSizeProps;
  labelText?: ReactNode;
  labelColor?: string;
  helperText?: string;
  labelVariant?: Pick<TypographyProps, 'variant'>;
  labelLines?: number;
  error?: boolean;
};

export const Checkbox = withStaticProperties(
  CheckboxFrame.extractable(
    ({
      children,
      color = 'primary',
      size = 'md',
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      labelText,
      labelLines,
      labelColor,
      helperText,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      labelVariant = 'body1',
      ...props
    }: CheckboxProps) => {
      const textColor = props.disabled ? '$onSurfaceOpacity16P' : '$onSurface';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const iconSize = useTokenValue('size', iconSizeMapping[size] || '$3');
      const [checked = false, setChecked] = useControllableState({
        prop: checkedProp,
        defaultProp: defaultChecked!,
        onChange: onCheckedChange
      });

      function onPress() {
        setChecked(!checked);
      }

      return (
        <Stack gap={'$xs'} flex={1} {...(props.disabled && { pointerEvents: 'none' })}>
          <XStack alignItems="center">
            <Stack padding="$1">
              <CheckboxFrame
                onPress={onPress}
                unstyled
                {...props}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                checkboxSize={size}
                clr={color}
                checked={checked}
                onCheckedChange={setChecked}
                defaultChecked={defaultChecked}>
                {children || (
                  <TMCheckbox.Indicator>
                    <Icon icon={<Check size={iconSize} />} color={'white'} />
                  </TMCheckbox.Indicator>
                )}
                <CheckboxStateFrame cursor="pointer" onPress={onPress} />
              </CheckboxFrame>
            </Stack>
            {labelText && (
              <Stack onPress={onPress} cursor="pointer" flex={1}>
                {typeof labelText === 'string' ? (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  <Typography
                    color={props.error ? labelColor : textColor}
                    numberOfLines={labelLines}
                    variant={labelVariant}
                    flexShrink={1}>
                    {labelText}
                  </Typography>
                ) : (
                  labelText
                )}
              </Stack>
            )}
          </XStack>
          {helperText && (
            <Typography variant="caption1" color={props.error ? '$error' : textColor}>
              {helperText}
            </Typography>
          )}
        </Stack>
      );
    }
  ),
  { Indicator: TMCheckbox.Indicator }
);
