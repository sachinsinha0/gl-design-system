import { YStack, Container } from '@gl/elements';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const LEVELS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

export function ElevationPage() {
  return (
    <YStack gap="$3">
      <DemoBlock title="Elevation" description="Shadow levels">
        {LEVELS.map((level) => (
          <VariantCell key={level} label={level}>
            <Container
              shadow={level}
              padding="$3"
              backgroundColor="$surfaceContainerLowest"
              width={120}
              height={64}
            />
          </VariantCell>
        ))}
      </DemoBlock>
    </YStack>
  );
}
