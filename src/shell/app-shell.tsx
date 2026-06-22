import { Outlet } from 'react-router-dom';
import { XStack, YStack, ScrollView } from '@gl/elements';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';
export function AppShell() {
  return (
    <XStack height="100vh" backgroundColor="$surface">
      <Sidebar />
      <YStack flex={1}>
        <TopBar />
        <ScrollView flex={1} contentContainerStyle={{ padding: 32 }}>
          <Outlet />
        </ScrollView>
      </YStack>
    </XStack>
  );
}
