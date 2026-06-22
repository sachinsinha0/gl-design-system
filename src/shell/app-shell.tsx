import { Outlet } from 'react-router-dom';
import { XStack, YStack, ScrollView } from '@gl/elements';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';

export function AppShell() {
  return (
    <XStack height="100vh" backgroundColor="$surface">
      <Sidebar />
      <YStack flex={1} backgroundColor="$background">
        <TopBar />
        <ScrollView
          flex={1}
          contentContainerStyle={{
            paddingHorizontal: 40,
            paddingVertical: 36,
            alignItems: 'center'
          }}
        >
          <YStack width="100%" maxWidth={1180}>
            <Outlet />
          </YStack>
        </ScrollView>
      </YStack>
    </XStack>
  );
}
