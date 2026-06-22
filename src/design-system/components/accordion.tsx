import { Container, ContainerProps, ContainerType } from './container';
import { Separator } from './separator';
import { IconButton } from './icon-button';
import { ChevronDown, ChevronUp } from '../icons';
import { StackProps } from '@tamagui/core';
import { isNil } from 'ramda';
import React, { ReactElement, ReactNode, useState } from 'react';
import { Spinner, Stack, XStack } from 'tamagui';
import { Platform } from 'react-native';

export type AccordionProps = {
  container?: ContainerType;
  children?:
    | ReactElement<AccordionDetailsProps>
    | ReactElement<AccordionSummaryProps>
    | Array<ReactElement<AccordionDetailsProps> | ReactElement<AccordionSummaryProps>>;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  separator?: boolean;
  separatorComponent?: ReactNode;
  padding?: string | number;
  space?: string | number;
  square?: boolean;
  onPress?: () => void;
  variant?: 'basic' | 'small';
  paddingVertical?: string | number;
  paddingHorizontal?: string | number;
  disabled?: boolean;
} & ContainerProps;

export type AccordionDetailsProps = {
  children?: ReactNode;
} & StackProps;

export type AccordionSummaryProps = {
  children?: ReactNode;
  expandIcon?: ReactNode;
  collapseIcon?: ReactNode;
  backgroundColor?: string;
  isLoading?: boolean;
  expandIconPosition?: 'center' | 'flex-start' | string;
} & StackProps;

const AccordionContext = React.createContext<{ expanded?: boolean; onToggle?: () => void }>({});

export function AccordionSummary({
  expandIcon = ChevronDown,
  collapseIcon = ChevronUp,
  isLoading,
  children,
  onPress,
  expandIconPosition,
  ...props
}: AccordionSummaryProps) {
  const { expanded, onToggle } = React.useContext(AccordionContext);

  return (
    <XStack {...props} onPress={onPress}>
      <Stack flex={1} justifyContent="center">
        {children}
      </Stack>
      {isLoading ? (
        <Spinner color="$primary" size="small" />
      ) : (
        <IconButton
          justifyContent={expandIconPosition ? expandIconPosition : 'flex-start'}
          onPress={(e) => {
            if (Platform.OS === 'web') {
              onPress?.(e);
            } else {
              onPress?.(e);
              onToggle();
            }
          }}
          color={expanded ? '$primary' : '$onSurface'}
          icon={expanded ? collapseIcon : expandIcon}
          variant="text"
          size="sm"
        />
      )}
    </XStack>
  );
}

export function AccordionDetails({ children, ...props }: AccordionDetailsProps) {
  return <Stack {...props}>{children}</Stack>;
}

export function Accordion({
  container = 'lowest',
  children,
  defaultExpanded = false,
  onChange,
  separator = true,
  expanded,
  borderRadius,
  borderColor,
  backgroundColor,
  padding,
  square = true,
  space = 0,
  onPress,
  separatorComponent,
  variant = 'basic', // Default variant is basic
  paddingVertical,
  paddingHorizontal,
  disabled,
  ...props
}: AccordionProps) {
  const [expand, toggleExpand] = useState(defaultExpanded);
  const [summary, ...details] = React.Children.toArray(children);
  const controlledExpand = !isNil(expanded) ? expanded : expand;
  const contextValue = React.useMemo(
    () => ({ expanded: controlledExpand, onToggle: onToggle }),
    [controlledExpand, onToggle]
  );

  function onToggle() {
    onPress?.();
    if (!disabled) {
      const updatedExpandedValue = !controlledExpand;
      toggleExpand(updatedExpandedValue);
      if (typeof onChange === 'function') {
        onChange(updatedExpandedValue);
      }
    }
  }

  // Define styles and behaviors based on variant
  const variantStyles = {
    basic: {
      paddingVertical: paddingVertical ?? padding ?? '$2',
      paddingHorizontal: paddingHorizontal ?? padding ?? '$2',
      borderRadius: square ? 0 : borderRadius ?? '$true',
      separatorComponent: separatorComponent || <Separator marginVertical="$2" />
    },
    small: {
      paddingVertical: paddingVertical ?? padding ?? '$1',
      paddingHorizontal: paddingHorizontal ?? padding ?? '$2',
      borderRadius: square ? 0 : borderRadius ?? '$true',
      separatorComponent: separatorComponent || <Separator marginVertical="$1" />
    }
  };

  const currentVariantStyles = variantStyles[variant];

  return (
    <Container
      {...props}
      borderRadius={currentVariantStyles.borderRadius}
      container={container}
      paddingVertical={currentVariantStyles.paddingVertical}
      paddingHorizontal={currentVariantStyles.paddingHorizontal}
      borderColor={borderColor}
      backgroundColor={backgroundColor}>
      <Stack cursor={'pointer'} onPress={onToggle}>
        <AccordionContext.Provider value={contextValue}>{summary}</AccordionContext.Provider>
      </Stack>
      {controlledExpand && (
        <Stack animation="bouncy">
          {separator && currentVariantStyles.separatorComponent}
          {!!space && <Stack height={space} />}
          {details}
        </Stack>
      )}
    </Container>
  );
}
