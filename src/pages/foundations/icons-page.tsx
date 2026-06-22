import { YStack, Typography } from '@gl/elements';
import {
  Home,
  Search,
  Settings,
  Heart,
  Star,
  Bell,
  User,
  Check,
  ChevronRight,
  Plus
} from '@tamagui/lucide-icons';
import {
  PlayFilled,
  PauseFilled,
  StopFilled,
  Bot2,
  Edit,
  ForwardTime,
  BackwardTime
} from '@gl/elements/icons';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const LUCIDE: { name: string; Comp: React.ComponentType<{ size?: number }> }[] = [
  { name: 'Home', Comp: Home },
  { name: 'Search', Comp: Search },
  { name: 'Settings', Comp: Settings },
  { name: 'Heart', Comp: Heart },
  { name: 'Star', Comp: Star },
  { name: 'Bell', Comp: Bell },
  { name: 'User', Comp: User },
  { name: 'Check', Comp: Check },
  { name: 'ChevronRight', Comp: ChevronRight },
  { name: 'Plus', Comp: Plus }
];

const CUSTOM: { name: string; Comp: React.ComponentType<{ size?: number }> }[] = [
  { name: 'PlayFilled', Comp: PlayFilled },
  { name: 'PauseFilled', Comp: PauseFilled },
  { name: 'StopFilled', Comp: StopFilled },
  { name: 'Bot2', Comp: Bot2 },
  { name: 'Edit', Comp: Edit },
  { name: 'ForwardTime', Comp: ForwardTime },
  { name: 'BackwardTime', Comp: BackwardTime }
];

export function IconsPage() {
  return (
    <YStack gap="$3">
      <Typography variant="body1" color="$onSurfaceVariant">
        The app uses Lucide icons and a vendored custom SVG icon set. Material font icons are not
        wired for web and render nothing, so prefer these.
      </Typography>
      <DemoBlock title="Lucide icons" description="From @tamagui/lucide-icons">
        {LUCIDE.map(({ name, Comp }) => (
          <VariantCell key={name} label={name}>
            <Comp size={24} />
          </VariantCell>
        ))}
      </DemoBlock>
      <DemoBlock title="Design-system SVG icons" description="Vendored custom icons from @gl/elements/icons">
        {CUSTOM.map(({ name, Comp }) => (
          <VariantCell key={name} label={name}>
            <Comp size={24} />
          </VariantCell>
        ))}
      </DemoBlock>
    </YStack>
  );
}
