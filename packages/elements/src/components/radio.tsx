import { ActionColorProps, ActionSizeProps, Typography, TypographyProps, useColorValue, useHighContrast } from '../';
import { Stack, styled } from '@tamagui/core';
import React from 'react';
import {
  RadioGroup as TMRadioGroup,
  ThemeableStack,
  XStack,
  RadioGroupProps as TMRadioGroupProps
} from 'tamagui';
import { Platform } from 'react-native';
import { useCallback } from 'react';

const sizeMapping = {
  sm: '$2.5',
  md: '$3'
};

function getRadioContainerFrameColorStyle(val, { theme, props }) {
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

export const RadioStateFrame = styled(ThemeableStack, {
  name: 'RadioStateFrame',
  borderRadius: '$3',
  position: 'absolute',
  left: '$-1',
  right: '$-1',
  top: '$-1',
  bottom: '$-1',
  variants: {
    clr: {
      ':string': getRadioContainerFrameColorStyle
    }
  } as const,
  defaultVariants: {
    clr: 'primary'
  }
});

export type RadioColorProps = ActionColorProps;
export type RadioSizeProps = Omit<ActionSizeProps, 'lg' | 'xl'>;

export type RadioProps = TMRadioGroupProps & {
  color?: RadioColorProps;
  size?: RadioSizeProps;
  labelText?: string;
  labelVariant?: Pick<TypographyProps, 'variant'>;
  value: string;
  checked: boolean;
  onValueChange: (value: string) => void;
  error?: boolean;
};

export function Radio({
  color = 'primary',
  labelText,
  size = 'md',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  labelVariant = 'body1',
  checked,
  value,
  onValueChange,
  ...props
}: RadioProps) {
  const colorValue = useColorValue(color);
  const textColor = props.disabled ? '$onSurfaceVariant' : '$onSurface';
  const isHighContrast = useHighContrast();

  const onPress = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (typeof onValueChange === 'function') {
        onValueChange(value);
      }
    },
    [onValueChange, value]
  );

  return (
    <XStack alignItems="center" cursor="pointer">
      <Stack padding="$1" justifyContent="center">
        <TMRadioGroup value={checked ? value : ''} {...props}>
          <TMRadioGroup.Item
            value={value}
            backgroundColor="transparent"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onPress={onPress}
            size={sizeMapping[size] || size}
            borderWidth={isHighContrast && checked ? 3 : 1}
            borderRadius={'$3'}
            cursor="pointer"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            scaleSize={1}
            borderColor={props.error ? '$error' : checked ? colorValue : '$onSurfaceVariant'}>
            <TMRadioGroup.Indicator
              backgroundColor={colorValue}
              width="$1.5"
              height={'$1.5'}
              {...(Platform.OS === 'web' && checked && {
                borderWidth: 2,
                // Use the resolved indicator color, not `currentColor` (which
                // resolves to the inherited CSS color — black — on web).
                borderColor: colorValue,
                borderStyle: 'solid'
              })}
            />
            <RadioStateFrame {...Platform.select({ native: { onPress: onPress } })} />
          </TMRadioGroup.Item>
        </TMRadioGroup>
      </Stack>
      {labelText && (
        <Typography
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          flexShrink={1}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          variant={labelVariant}
          color={props.error ? '$error' : textColor}
          onPress={onPress}>
          {labelText}
        </Typography>
      )}
    </XStack>
  );
}
