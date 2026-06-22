import { YStack, XStack, Button, IconButton } from '@gl/elements';
import { Home, Heart, Settings } from '@tamagui/lucide-icons';
import { DemoBlock, VariantCell } from '../../showcase-kit';
const VARIANTS = ['contained', 'outlined', 'tonal', 'text'] as const;
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;
export function ButtonsPage() {
  return (
    <YStack gap="$3">
      <DemoBlock title="Variants" description="contained · outlined · tonal · text">
        {VARIANTS.map((variant) => (
          <VariantCell key={variant} label={variant}>
            <Button variant={variant} startIcon={Home}>Button</Button>
          </VariantCell>
        ))}
      </DemoBlock>
      <DemoBlock title="Sizes" description="sm · md · lg · xl">
        {SIZES.map((size) => (
          <VariantCell key={size} label={size}>
            <Button variant="contained" size={size} startIcon={Home}>Button</Button>
          </VariantCell>
        ))}
      </DemoBlock>
      <DemoBlock title="Icon placement">
        <VariantCell label="startIcon"><Button variant="contained" startIcon={Home}>Leading</Button></VariantCell>
        <VariantCell label="endIcon"><Button variant="contained" endIcon={Heart}>Trailing</Button></VariantCell>
      </DemoBlock>
      <DemoBlock title="States">
        <VariantCell label="disabled"><Button variant="contained" disabled startIcon={Home}>Disabled</Button></VariantCell>
      </DemoBlock>
      <DemoBlock title="IconButtons" description="Lucide-only">
        <XStack gap="$2">
          <IconButton icon={Home} variant="text" />
          <IconButton icon={Heart} variant="tonal" />
          <IconButton icon={Settings} variant="outlined" />
        </XStack>
      </DemoBlock>
    </YStack>
  );
}
