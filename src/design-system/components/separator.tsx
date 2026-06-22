import { StackProps } from '@tamagui/core';
import React from 'react';
import { Separator as TMSeparator } from 'tamagui';
export type SeparatorProps = StackProps & { vertical?: boolean };

export function Separator({ borderColor = '$outlineOpacity16P', ...props }: SeparatorProps) {
  return <TMSeparator borderColor={borderColor} {...props} />;
}
