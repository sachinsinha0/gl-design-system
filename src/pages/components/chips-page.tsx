import { useState } from 'react';
import { YStack, XStack, Chip } from '@gl/elements';
import { Home } from '@tamagui/lucide-icons';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const VARIANTS = ['filled', 'outlined'] as const;
const SIZES = ['sm', 'md'] as const;
const COLORS = ['default', 'warning', 'success', 'rose'] as const;

export function ChipsPage() {
  const [chips, setChips] = useState(['React', 'Tamagui', 'TypeScript']);

  return (
    <YStack gap="$3">
      <DemoBlock title="Variants" description="variant: filled (default) · outlined. label is a string prop.">
        {VARIANTS.map((variant) => (
          <VariantCell key={variant} label={variant}>
            <Chip variant={variant} label="Chip" />
          </VariantCell>
        ))}
      </DemoBlock>

      <DemoBlock title="Sizes" description="size: sm (24px) · md (32px, default).">
        {SIZES.map((size) => (
          <VariantCell key={size} label={size}>
            <Chip size={size} label={`Chip ${size}`} />
          </VariantCell>
        ))}
      </DemoBlock>

      <DemoBlock title="Colors" description="color tints the chip: default · warning · success · rose.">
        {COLORS.map((color) => (
          <VariantCell key={color} label={color}>
            <XStack gap="$2" alignItems="center">
              <Chip color={color} label="Filled" />
              <Chip variant="outlined" color={color} label="Outlined" />
            </XStack>
          </VariantCell>
        ))}
      </DemoBlock>

      <DemoBlock title="Leading icon" description="icon accepts a Lucide component (icon={Home}).">
        <VariantCell label="filled">
          <Chip label="Home" icon={Home} />
        </VariantCell>
        <VariantCell label="outlined">
          <Chip variant="outlined" label="Home" icon={Home} />
        </VariantCell>
      </DemoBlock>

      <DemoBlock title="Clickable" description="onPress makes the chip pressable with hover/press states.">
        <VariantCell label="filled">
          <Chip label="Press me" onPress={() => {}} />
        </VariantCell>
        <VariantCell label="outlined">
          <Chip variant="outlined" label="Press me" onPress={() => {}} />
        </VariantCell>
      </DemoBlock>

      <DemoBlock
        title="Removable"
        description="onDelete renders a trailing close (X) icon. Click to remove from the live list below.">
        {chips.length === 0 ? (
          <Chip label="All cleared" variant="outlined" />
        ) : (
          chips.map((label) => (
            <Chip
              key={label}
              label={label}
              variant="outlined"
              onDelete={() => setChips((prev) => prev.filter((c) => c !== label))}
            />
          ))
        )}
      </DemoBlock>

      <DemoBlock title="Disabled" description="disabled chips are non-interactive.">
        <VariantCell label="filled">
          <Chip disabled label="Disabled" />
        </VariantCell>
        <VariantCell label="outlined">
          <Chip disabled variant="outlined" label="Disabled" />
        </VariantCell>
      </DemoBlock>
    </YStack>
  );
}
