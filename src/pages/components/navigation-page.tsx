import {
  YStack,
  XStack,
  Stack,
  Typography,
  AppBar,
  AppBarIcon,
  BottomNavigation,
  BottomNavigationAction,
  Footer,
  FooterIcon
} from '@gl/elements';
import { ArrowLeft, Search, MoreVertical, Home, BookOpen, User, Bell } from '@tamagui/lucide-icons';
import { DemoBlock } from '../../showcase-kit';

export function NavigationPage() {
  return (
    <YStack gap="$3">
      <DemoBlock
        title="App Bar"
        description="Top bar. AppBar.Content lays out the row; AppBarIcon renders a tappable icon button (Lucide icons). withStatusBar={false} + position='relative' keep it inline for the catalog (normally fixed and driven by navigation).">
        <YStack width="100%">
          <AppBar withStatusBar={false} position="relative" separator>
            <AppBar.Content justifyContent="space-between">
              <XStack alignItems="center" gap="$1">
                <AppBarIcon icon={ArrowLeft} />
                <Typography variant="h5">Data Science</Typography>
              </XStack>
              <XStack alignItems="center" gap="$1">
                <AppBarIcon icon={Search} />
                <AppBarIcon icon={MoreVertical} />
              </XStack>
            </AppBar.Content>
          </AppBar>
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Bottom Navigation"
        description="Bottom tab bar. BottomNavigationAction takes a label + Lucide icon and an active flag for the selected tab. Rendered inside a relative wrapper here (the component pins itself to the bottom in a real screen).">
        <YStack width="100%">
          <Stack position="relative" width="100%">
            <BottomNavigation separator style={{ position: 'relative' }}>
              <BottomNavigationAction label="Home" icon={<Home />} active />
              <BottomNavigationAction label="Courses" icon={<BookOpen />} />
              <BottomNavigationAction label="Alerts" icon={<Bell />} badge={3} />
              <BottomNavigationAction label="Profile" icon={<User />} />
            </BottomNavigation>
          </Stack>
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Footer"
        description="Bottom action bar. Footer.Content lays out the row; FooterIcon renders icon buttons. position='relative' keeps it inline for the catalog (normally fixed at the bottom).">
        <YStack width="100%">
          <Footer position="relative" separator>
            <Footer.Content justifyContent="space-between">
              <Typography variant="body2" color="$onSurfaceVariant">
                © 2026 Great Learning
              </Typography>
              <XStack alignItems="center" gap="$1">
                <FooterIcon icon={Home} />
                <FooterIcon icon={Bell} />
                <FooterIcon icon={User} />
              </XStack>
            </Footer.Content>
          </Footer>
        </YStack>
      </DemoBlock>
    </YStack>
  );
}
