import { Typography } from './typography';
import { MoreHorizontal } from '../icons';
import React, { ReactNode, useState } from 'react';
import { XStack } from 'tamagui';
import { StackProps } from '@tamagui/core';

export type BreadcrumbProps = {
  maxItems?: number;
  separator?: ReactNode;
  children: ReactNode;
} & StackProps;

const generateCollapsibleChildrens = ({
  childrens,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  onExpand
}) => {
  const onPress = () => {
    onExpand(true);
  };

  return [
    ...childrens.slice(0, itemsBeforeCollapse),
    // eslint-disable-next-line react/jsx-key
    <XStack
      onPress={onPress}
      cursor="pointer"
      backgroundColor={'$surfaceContainerHigh'}
      alignItems="center"
      borderRadius="$0.25"
      paddingHorizontal="$0.5">
      <MoreHorizontal color="$onSurfaceVariant" size="$2" />
    </XStack>,
    ...childrens.slice(childrens.length - itemsAfterCollapse, childrens.length)
  ];
};

export function Breadcrumbs({
  children,
  maxItems = 8,
  separator = (
    <Typography variant={'body1'} color="$onSurfaceVariant">
      /
    </Typography>
  ),
  space = '$1',
  ...props
}: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const allItems =
    expanded || (maxItems && childrenArray.length <= maxItems)
      ? childrenArray
      : generateCollapsibleChildrens({ childrens: childrenArray, onExpand: setExpanded });
  const childrenWithSeperator = allItems.reduce((newChildren, child, index) => {
    if (index !== childrenArray.length - 1) {
      newChildren.push(
        <React.Fragment key={index}>
          {child}
          {separator}
        </React.Fragment>
      );
    } else {
      newChildren.push(<React.Fragment key={index}>{child}</React.Fragment>);
    }
    return newChildren;
  }, []);

  return (
    <XStack space={space} {...props} alignItems="center">
      {childrenWithSeperator}
    </XStack>
  );
}
