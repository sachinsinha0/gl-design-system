import { useColorValue, useTokenValue } from '../hooks';
import React, { ReactNode } from 'react';
import MRNIcon from 'react-native-vector-icons/dist/MaterialIcons';
import MCRNIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { useGetThemedIcon } from 'tamagui';
import { StackProps, Stack } from '@tamagui/core';

export type IconProps = {
  color?: string;
  size?: number | string;
  icon?: ReactNode;
} & StackProps;

//Please use Lucide icons, we have kept support for material icons for backward compatibility
export const Icon = ({ color = '$onSurface', icon, size = '$3', ...props }: IconProps) => {
  const isMaterialCommunity = typeof icon == 'string' && icon?.startsWith('mcom-');
  const isMaterial = typeof icon == 'string';
  const colorValue = useColorValue(color);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  let sizeValue = useTokenValue('size', size) || size;
  sizeValue = (typeof size === 'number' ? size : sizeValue) - 2;
  const getThemedIcon = useGetThemedIcon({ size: sizeValue, color: colorValue });
  return (
    <Stack {...props}>
      <Stack padding={2}>
        {isMaterialCommunity && <MCRNIcon color={colorValue} name={icon} />}
        {!isMaterial && !isMaterialCommunity && getThemedIcon(icon)}
        {isMaterial && !isMaterialCommunity && (
          <MRNIcon size={sizeValue} color={colorValue} name={icon} />
        )}
      </Stack>
    </Stack>
  );
};
