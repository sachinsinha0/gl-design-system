import { YStack, Typography, useTheme } from '@gl/elements';
import { DemoBlock } from '../../showcase-kit';

type Card = { token: string; on?: string; bordered?: boolean };

function ColorCard({ token, on, bordered }: Card) {
  const theme = useTheme();
  const raw = (theme as Record<string, { get?: () => string } | undefined>)[token];
  const value = raw?.get?.() ?? `$${token}`;
  return (
    <YStack width={164} gap="$1">
      <YStack
        height={76}
        borderRadius={12}
        padding="$2"
        justifyContent="flex-end"
        backgroundColor={`$${token}` as never}
        borderWidth={bordered ? 1 : 0}
        borderColor="$outlineVariant"
      >
        {on ? (
          <Typography variant="caption1" color={`$${on}` as never}>
            {on}
          </Typography>
        ) : null}
      </YStack>
      <Typography variant="caption1" color="$onSurface">
        {token}
      </Typography>
      <Typography variant="caption2" color="$onSurfaceVariant">
        {String(value)}
      </Typography>
    </YStack>
  );
}

const PRIMARY: Card[] = [
  { token: 'primary', on: 'onPrimary' },
  { token: 'primaryContainer', on: 'onPrimaryContainer' },
  { token: 'primaryFixed', on: 'onPrimaryFixed' },
  { token: 'primaryFixedDim', on: 'onPrimaryFixedVariant' },
  { token: 'inversePrimary' },
  { token: 'surfaceTint' }
];

const SECONDARY: Card[] = [
  { token: 'secondary', on: 'onSecondary' },
  { token: 'secondaryContainer', on: 'onSecondaryContainer' }
];

const TERTIARY: Card[] = [
  { token: 'tertiary', on: 'onTertiary' },
  { token: 'tertiaryContainer', on: 'onTertiaryContainer' }
];

const ERROR: Card[] = [
  { token: 'error', on: 'onError' },
  { token: 'errorContainer', on: 'onErrorContainer' }
];

const SURFACES: Card[] = [
  { token: 'background', on: 'onBackground', bordered: true },
  { token: 'surface', on: 'onSurface', bordered: true },
  { token: 'surfaceVariant', on: 'onSurfaceVariant', bordered: true },
  { token: 'surfaceContainerLowest', on: 'onSurface', bordered: true },
  { token: 'surfaceContainerLow', on: 'onSurface', bordered: true },
  { token: 'surfaceContainer', on: 'onSurface', bordered: true },
  { token: 'surfaceContainerHigh', on: 'onSurface', bordered: true },
  { token: 'surfaceContainerHighest', on: 'onSurface', bordered: true },
  { token: 'surfaceBright', on: 'onSurface', bordered: true },
  { token: 'surfaceDim', on: 'onSurface', bordered: true },
  { token: 'inverseSurface', on: 'inverseOnSurface' }
];

const UTILITY: Card[] = [{ token: 'outline' }, { token: 'outlineVariant', bordered: true }];

export function ColorsPage() {
  return (
    <YStack gap="$2">
      <Typography variant="body1" color="$onSurfaceVariant">
        Material 3 role tokens, rendered live from the active theme. Each fill shows its paired
        on- role as the label — always use a role with its pair. Switch theme &amp; mode from the
        top bar; never reference a raw hex, reference the token.
      </Typography>
      <DemoBlock title="Primary" description="Main actions, emphasis, active states">
        {PRIMARY.map((c) => (
          <ColorCard key={c.token} {...c} />
        ))}
      </DemoBlock>
      <DemoBlock
        title="Secondary"
        description="Less-prominent components, secondary buttons, filter chips"
      >
        {SECONDARY.map((c) => (
          <ColorCard key={c.token} {...c} />
        ))}
      </DemoBlock>
      <DemoBlock title="Tertiary" description="Contrasting accents, used sparingly">
        {TERTIARY.map((c) => (
          <ColorCard key={c.token} {...c} />
        ))}
      </DemoBlock>
      <DemoBlock title="Error" description="The only built-in status role in M3">
        {ERROR.map((c) => (
          <ColorCard key={c.token} {...c} />
        ))}
      </DemoBlock>
      <DemoBlock
        title="Surfaces"
        description="Tonal elevation — raise importance with a higher container, not shadows"
      >
        {SURFACES.map((c) => (
          <ColorCard key={c.token} {...c} />
        ))}
      </DemoBlock>
      <DemoBlock
        title="Outline & utility"
        description="Borders and dividers (decorative / AA-large only)"
      >
        {UTILITY.map((c) => (
          <ColorCard key={c.token} {...c} />
        ))}
      </DemoBlock>
    </YStack>
  );
}
