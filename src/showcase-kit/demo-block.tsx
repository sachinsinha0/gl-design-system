import type { ReactNode } from 'react';
import { YStack, XStack, Typography, Separator } from '@gl/elements';
export type DemoBlockProps = { title: string; description?: string; children: ReactNode };
export function DemoBlock({ title, description, children }: DemoBlockProps) {
  return (
    <YStack gap="$2" paddingVertical="$3">
      <YStack gap="$1">
        <Typography variant="h4">{title}</Typography>
        {description ? <Typography variant="body2" color="$onSurfaceVariant">{description}</Typography> : null}
      </YStack>
      <Separator />
      <XStack gap="$3" flexWrap="wrap" alignItems="center" paddingTop="$2">{children}</XStack>
    </YStack>
  );
}
