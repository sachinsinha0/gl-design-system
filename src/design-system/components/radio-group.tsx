import { ActionColorProps, ActionSizeProps, Typography, TypographyProps, useColorValue, useHighContrast } from '../';
import { Stack, styled, withStaticProperties } from '@tamagui/core';
import React, { ReactNode, useCallback, useState } from 'react';
import {
  RadioGroup as TMRadioGroup,
  RadioGroupProps as TMRadioGroupProps,
  ThemeableStack,
  XStack
} from 'tamagui';
import { isNil } from 'ramda';
import { Platform } from 'react-native';

const RadioGroupContext = React.createContext<{
  groupValue?: string;
  toggleGroupValue: (value: string) => void;
}>({
  toggleGroupValue: () => {
    //dummy
  }
});

const sizeMapping = {
  sm: '$2.5',
  md: '$3'
};

function getRadioGroupContainerFrameColorStyle(val, { theme, props }) {
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

export const RadioGroupItemStateFrame = styled(ThemeableStack, {
  name: 'RadioGroupItemStateFrame',
  borderRadius: '$3',
  position: 'absolute',
  left: '$-1',
  right: '$-1',
  top: '$-1',
  bottom: '$-1',
  variants: {
    clr: {
      ':string': getRadioGroupContainerFrameColorStyle
    }
  } as const,
  defaultVariants: {
    clr: 'primary'
  }
});

export type RadioGroupColorProps = ActionColorProps;
export type RadioGroupSizeProps = Omit<ActionSizeProps, 'lg' | 'xl'>;

export type RadioGroupProps = TMRadioGroupProps & {
  helperText?: string;
  error?: boolean;
  labelText?: string;
  labelVariant?: Pick<TypographyProps, 'variant'>;
};

export type RadioGroupItemProps = {
  color?: RadioGroupColorProps;
  size?: RadioGroupSizeProps;
  labelText?: ReactNode;
  labelVariant?: Pick<TypographyProps, 'variant'>;
  error?: boolean;
  value?: string;
};

export function RadioItem({
  color = 'primary',
  labelText,
  size = 'md',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  labelVariant = 'body1',
  ...props
}: RadioGroupItemProps) {
  const { groupValue, toggleGroupValue } = React.useContext(RadioGroupContext);
  const colorValue = useColorValue(color);
  const isHighContrast = useHighContrast();
  
  function onPress(e) {
    e.stopPropagation();
    e.preventDefault();
    toggleGroupValue(props.value);
  }

  return (
    <XStack alignItems="center" cursor={'pointer'}>
      <Stack padding="$1">
        <TMRadioGroup.Item
          {...props}
          onPress={onPress}
          backgroundColor="transparent"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          size={sizeMapping[size] || size}
          borderWidth={isHighContrast && groupValue === props.value ? 3 : 1}
          borderRadius={'$3'}
          cursor="pointer"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          scaleSize={1}
          borderColor={groupValue === props.value ? colorValue : '$onSurfaceVariant'}>
          <TMRadioGroup.Indicator 
            backgroundColor={colorValue} 
            width="$1.5"
            height={'$1.5'}
          />
          <RadioGroupItemStateFrame {...Platform.select({ native: { onPress: onPress } })} />
        </TMRadioGroup.Item>
      </Stack>
      {typeof labelText === 'string' ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        <Typography
          flexShrink={1}
          textOverflow={'ellipsis'}
          width="100%"
          variant={labelVariant}
          onPress={onPress}>
          {labelText}
        </Typography>
      ) : (
        labelText
      )}
    </XStack>
  );
}

export const RadioGroup = withStaticProperties(
  ({
    children,
    value,
    defaultValue,
    helperText,
    labelText,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    labelVariant = 'body1',
    onValueChange,
    ...props
  }: RadioGroupProps) => {
    const [groupValue, toggleGroupValue] = useState(defaultValue);
    const controlledGroupValue = !isNil(value) ? value : groupValue;
    const controlledToggleGroupValue = useCallback(
      (v) => {
        if (onValueChange) {
          onValueChange(v);
        }
        toggleGroupValue(v);
      },
      [onValueChange]
    );
    const contextValue = React.useMemo(
      () => ({
        groupValue: controlledGroupValue,
        toggleGroupValue: controlledToggleGroupValue
      }),
      [controlledGroupValue, controlledToggleGroupValue]
    );
    const textColor = props.disabled ? '$onSurfaceVariant' : '$onSurface';

    return (
      <TMRadioGroup {...props} value={controlledGroupValue}>
        {labelText && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <Typography variant={labelVariant} color={props.error ? '$error' : textColor}>
            {labelText}
          </Typography>
        )}
        <RadioGroupContext.Provider value={contextValue}>{children}</RadioGroupContext.Provider>
        {helperText && (
          <Typography marginTop="$xs" variant="caption1" color={props.error ? '$error' : textColor}>
            {helperText}
          </Typography>
        )}
      </TMRadioGroup>
    );
  },
  { Item: RadioItem }
);
