import { YStack, Typography } from '@gl/elements';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const VARIANTS: { name: string; px: number }[] = [
  { name: 'h1', px: 26 },
  { name: 'h2', px: 24 },
  { name: 'h3', px: 22 },
  { name: 'h4', px: 20 },
  { name: 'h5', px: 18 },
  { name: 'subtitle1', px: 16 },
  { name: 'subtitle2', px: 14 },
  { name: 'body1', px: 16 },
  { name: 'body2', px: 14 },
  { name: 'caption1', px: 12 },
  { name: 'caption2', px: 10 },
  { name: 'overline', px: 10 }
];

export function TypographyPage() {
  return (
    <YStack gap="$3">
      <DemoBlock title="Typography variants" description="The 12 Typography variants">
        {VARIANTS.map((v) => (
          <VariantCell key={v.name} label={`${v.name} · ${v.px}px`}>
            <Typography variant={v.name}>The quick brown fox</Typography>
          </VariantCell>
        ))}
      </DemoBlock>
    </YStack>
  );
}
