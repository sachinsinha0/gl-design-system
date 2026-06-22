import type { ReactNode } from 'react';
import { YStack, Typography } from '@gl/elements';
export type VariantCellProps = { label: string; children: ReactNode };
export function VariantCell({ label, children }: VariantCellProps) {
  return (
    <YStack gap="$1" alignItems="flex-start" minWidth={140}>
      <Typography variant="caption1" color="$onSurfaceVariant">{label}</Typography>
      {children}
    </YStack>
  );
}
