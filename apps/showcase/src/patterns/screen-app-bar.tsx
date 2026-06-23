import type { ReactNode } from 'react';
import { XStack, Typography, IconButton } from '@gl/elements';
import { ChevronLeft } from '@tamagui/lucide-icons';

export type ScreenAppBarProps = {
  title: string;
  onBack?: () => void;
  trailing?: ReactNode;
};

export function ScreenAppBar({ title, onBack, trailing }: ScreenAppBarProps) {
  return (
    <XStack
      height={56}
      alignItems="center"
      gap="$2"
      paddingHorizontal="$3"
      backgroundColor="$surface"
      borderBottomWidth={1}
      borderBottomColor="$outlineVariant">
      {onBack ? <IconButton icon={ChevronLeft} variant="text" onPress={onBack} /> : null}
      <Typography variant="subtitle1" flex={1}>
        {title}
      </Typography>
      {trailing ?? null}
    </XStack>
  );
}
