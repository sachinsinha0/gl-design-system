import { YStack, XStack, Typography } from '@gl/elements';
import { DemoBlock, Swatch } from '../../showcase-kit';

const SEMANTIC = [
  'surface',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainerHigh',
  'onSurface',
  'onSurfaceVariant',
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'outline',
  'outlineVariant'
];

export function ColorsPage() {
  return (
    <YStack gap="$3">
      <Typography variant="body1" color="$onSurfaceVariant">
        Semantic color tokens, rendered live from the active theme. Switch themes from the top bar.
      </Typography>
      <DemoBlock title="Semantic tokens" description="Surfaces, text, brand, and borders">
        <XStack gap="$3" flexWrap="wrap">
          {SEMANTIC.map((token) => (
            <Swatch key={token} token={token} />
          ))}
        </XStack>
      </DemoBlock>
    </YStack>
  );
}
