import { withStaticProperties, isTouchable } from '@tamagui/core';
import React, { ReactNode } from 'react';
import { Platform } from 'react-native';
import {
  SizableStackProps,
  Tooltip as TMTooltip,
  TooltipProps as TMTooltipProps,
  Popover,
  PopoverArrowProps
} from 'tamagui';

export type TooltipProps = TMTooltipProps;
export type TooltipContentProps = SizableStackProps;

const TooltipContext = React.createContext<{ content?: ReactNode }>({});

function TooltipTrigger(props) {
  const { content } = React.useContext(TooltipContext);
  // console.log(showDialog, content);
  return (
    <TMTooltip.Trigger {...props}>
      {Platform.OS === 'web' && props.children}
      {Platform.OS !== 'web' && (
        <Popover>
          <Popover.Trigger>{props.children}</Popover.Trigger>
          <Popover.Content>{content}</Popover.Content>
        </Popover>
      )}
    </TMTooltip.Trigger>
  );
}

export function TooltipContent({
  children,
  arrowProps,
  ...props
}: TooltipContentProps & { arrowProps: PopoverArrowProps }) {
  return (
    <TMTooltip.Content
      unstyled
      enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
      exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
      scale={1}
      x={0}
      y={0}
      opacity={1}
      animation={[
        'quick',
        {
          opacity: {
            overshootClamping: true
          }
        }
      ]}
      {...props}>
      <TMTooltip.Arrow {...arrowProps} />
      {children}
    </TMTooltip.Content>
  );
}

export const Tooltip = withStaticProperties(
  ({ children, ...props }: TooltipProps) => {
    const [trigger, ...content] = React.Children.toArray(children);
    const contextValue = React.useMemo(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      () => ({ content: content[0]?.props?.children || <></> }),
      [content]
    );
    return (
      <TMTooltip {...props} delay={{ open: 250, close: 100 }}>
        <TooltipContext.Provider value={contextValue}>{trigger}</TooltipContext.Provider>
        {!isTouchable && content}
      </TMTooltip>
    );
  },
  { Content: TooltipContent, Trigger: TooltipTrigger }
);
