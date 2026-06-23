import { YStack, XStack, Stack, Separator, Typography } from '@gl/elements';
import { DemoBlock } from '../../showcase-kit';

const SPACING: { token: string; px: number; use: string }[] = [
  { token: '$0.5', px: 4, use: 'Tiny gaps, icon insets' },
  { token: '$1', px: 8, use: 'Icon ↔ label gaps' },
  { token: '$1.5', px: 12, use: 'Chip gaps' },
  { token: '$2', px: 16, use: 'Standard spacing, card inner gaps' },
  { token: '$3', px: 24, use: 'Section gaps, card padding' },
  { token: '$4', px: 32, use: 'Large section padding' },
  { token: '$6', px: 48, use: 'Banner / hero padding' }
];

export function SpacingPage() {
  return (
    <YStack gap="$2">
      <Typography variant="body1" color="$onSurfaceVariant">
        Spacing tokens — use them for padding and <Typography variant="body1" color="$onSurface">gap</Typography>,
        never hardcoded pixels. Let surfaces breathe; learner screens favour generous spacing.
      </Typography>
      <DemoBlock title="Spacing scale" description="Tamagui space tokens" layout="stack">
        {SPACING.map((s, i) => (
          <YStack key={s.token}>
            {i > 0 ? <Separator marginVertical="$2.5" /> : null}
            <XStack alignItems="center" gap="$3">
              <Typography variant="subtitle2" width={48}>
                {s.token}
              </Typography>
              <Typography variant="caption1" color="$onSurfaceVariant" width={44}>
                {s.px}px
              </Typography>
              <Stack height={16} width={s.px} backgroundColor="$primary" borderRadius={4} />
              <Typography variant="caption1" color="$onSurfaceVariant" flexShrink={1}>
                {s.use}
              </Typography>
            </XStack>
          </YStack>
        ))}
      </DemoBlock>
    </YStack>
  );
}
