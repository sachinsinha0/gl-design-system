import type { ReactNode } from 'react';
import { YStack, XStack, Typography, Container } from '@gl/elements';

export type DemoBlockProps = { title: string; description?: string; children: ReactNode };

export function DemoBlock({ title, description, children }: DemoBlockProps) {
  return (
    <YStack gap="$2.5" paddingVertical="$3">
      <YStack gap="$1">
        <Typography variant="subtitle1">{title}</Typography>
        {description ? (
          <Typography variant="body2" color="$onSurfaceVariant">
            {description}
          </Typography>
        ) : null}
      </YStack>
      <Container
        container="lowest"
        outlined
        borderRadius={16}
        padding="$4"
      >
        <XStack gap="$3" flexWrap="wrap" alignItems="center">
          {children}
        </XStack>
      </Container>
    </YStack>
  );
}
