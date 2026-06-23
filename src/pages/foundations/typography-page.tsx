import { YStack, XStack, Separator, Typography } from '@gl/elements';
import { DemoBlock } from '../../showcase-kit';

type Variant = { name: string; weight: number; size: string };

const VARIANTS: Variant[] = [
  { name: 'h1', weight: 600, size: '32 / 26' },
  { name: 'h2', weight: 600, size: '28 / 24' },
  { name: 'h3', weight: 600, size: '24 / 22' },
  { name: 'h4', weight: 600, size: '20 / 20' },
  { name: 'h5', weight: 600, size: '18 / 18' },
  { name: 'subtitle1', weight: 500, size: '16' },
  { name: 'subtitle2', weight: 500, size: '14' },
  { name: 'body1', weight: 400, size: '16' },
  { name: 'body2', weight: 400, size: '14' },
  { name: 'caption1', weight: 400, size: '12' },
  { name: 'caption2', weight: 400, size: '12 / 10' },
  { name: 'overline', weight: 600, size: '10' }
];

export function TypographyPage() {
  return (
    <YStack gap="$2">
      <Typography variant="body1" color="$onSurfaceVariant">
        12 Inter type styles, rendered at their real size. Sizes show desktop / mobile where they
        differ; body text never shrinks below 14px. Pick by structural level, not by size.
      </Typography>
      <DemoBlock title="Type scale" description="<Typography variant=…>" layout="stack">
        {VARIANTS.map((v, i) => (
          <YStack key={v.name}>
            {i > 0 ? <Separator marginVertical="$3" /> : null}
            <XStack alignItems="center" justifyContent="space-between" gap="$4">
              <Typography variant={v.name as never} flexShrink={1} numberOfLines={1}>
                The quick brown fox
              </Typography>
              <XStack gap="$3" alignItems="baseline" flexShrink={0}>
                <Typography variant="subtitle2" color="$onSurface">
                  {v.name}
                </Typography>
                <Typography
                  variant="caption1"
                  color="$onSurfaceVariant"
                  width={116}
                  textAlign="right"
                >
                  {v.weight} · {v.size}px
                </Typography>
              </XStack>
            </XStack>
          </YStack>
        ))}
      </DemoBlock>
    </YStack>
  );
}
