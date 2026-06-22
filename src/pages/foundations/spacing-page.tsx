import { YStack, XStack } from '@gl/elements';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const SPACING: { token: string; px: number }[] = [
  { token: '$0.5', px: 4 },
  { token: '$1', px: 8 },
  { token: '$1.5', px: 12 },
  { token: '$2', px: 16 },
  { token: '$3', px: 24 },
  { token: '$4', px: 32 },
  { token: '$6', px: 48 }
];

export function SpacingPage() {
  return (
    <YStack gap="$3">
      <DemoBlock title="Spacing scale" description="Spacing tokens">
        {SPACING.map((s) => (
          <VariantCell key={s.token} label={`${s.token} · ${s.px}px`}>
            <XStack height={16} width={s.px} backgroundColor="$primaryContainer" borderRadius="$1" />
          </VariantCell>
        ))}
      </DemoBlock>
    </YStack>
  );
}
