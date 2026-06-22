import { Separator } from './separator';
import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  Tabs as TMTabs,
  TabsContentProps,
  TabsListProps,
  TabsProps as TMTabProps,
  TabsTabProps as TMTabsTabProps,
  withStaticProperties,
  XStack,
  Stack
} from 'tamagui';
import { isNil } from 'ramda';

export type TabsTabProps = TMTabsTabProps & {
  activeColor?: string;
};

export type TabsProps = TMTabProps & {
  activeColor?: string;
};

const TabsContext = createContext<{
  orientation?: 'horizontal' | 'vertical';
  currentTab?: string;
  activeColor?: string;
}>({
  orientation: 'horizontal'
});

function List({
  children,
  borderRadius = 0,
  backgroundColor = 'transparent',
  separator = true,
  ...props
}: TabsListProps) {
  const { orientation } = useContext(TabsContext);

  return (
    <>
      <TMTabs.List
        {...props}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        unstyled>
        {children}
      </TMTabs.List>
      {orientation === 'horizontal' && separator && <Separator />}
    </>
  );
}

function Tab({ children, activeColor: activeColorProp, ...props }: TabsTabProps) {
  const { currentTab, activeColor } = useContext(TabsContext);
  const textColor = currentTab === props.value ? activeColorProp || activeColor : '$onSurface';
  const activeColoredChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      color: textColor
    })
  );
  return (
    <TMTabs.Tab
      cursor="pointer"
      flex={1}
      height={'$6'}
      {...props}
      borderRadius={0}
      // borderBottomWidth={0}
      unstyled
      borderBottomColor="$outlineOpacity16P">
      <XStack height="100%" justifyContent="center" alignItems="center">
        <Stack height={'100%'} justifyContent="center">
          {activeColoredChildren}
          {currentTab === props.value && (
            <Separator
              alignSelf="center"
              zIndex={1}
              borderTopLeftRadius={'$true'}
              borderTopRightRadius={'$true'}
              position="absolute"
              bottom={-2}
              left={0}
              right={0}
              borderWidth={'$0.25'}
              borderColor={textColor}
              backgroundColor={textColor}
            />
          )}
        </Stack>
      </XStack>
    </TMTabs.Tab>
  );
}

function Content({ children, ...props }: TabsContentProps) {
  return <TMTabs.Content {...props}>{children}</TMTabs.Content>;
}

export const Tabs = withStaticProperties(
  React.forwardRef(function Tabs(
    {
      children,
      orientation = 'horizontal',
      value,
      onValueChange: onValueChangeProp,
      defaultValue,
      activeColor = '$primary',
      ...props
    }: TabsProps,
    forwardedRef
  ) {
    const [currentTab, toggleCurrentTab] = useState(defaultValue);
    const controlledCurrentTabValue = !isNil(value) ? value : currentTab;
    const contextValue = useMemo(
      () => ({ orientation, currentTab: controlledCurrentTabValue, activeColor }),
      [orientation, controlledCurrentTabValue, activeColor]
    );

    return (
      <TMTabs
        {...props}
        zIndex={4}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ref={forwardedRef}
        value={value}
        defaultValue={defaultValue}
        orientation={orientation}
        borderRadius={0}
        onValueChange={(updatedCurrentTabValue) => {
          toggleCurrentTab(updatedCurrentTabValue);
          if (typeof onValueChangeProp === 'function') {
            onValueChangeProp(updatedCurrentTabValue);
          }
        }}
        flexDirection={orientation === 'horizontal' ? 'column' : 'row'}>
        <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
      </TMTabs>
    );
  }),
  { Tab, Content, List }
);
