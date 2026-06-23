import { Outlet } from 'react-router-dom';
import { XStack, YStack, ScrollView } from '@gl/elements';
import { DSProvider } from '../platform/ds-context';
import { ActiveDSProvider } from '../platform/providers';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';

function Shell() {
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

export function AppShell() {
  return (
    <DSProvider>
      <ActiveDSProvider>
        <Shell />
      </ActiveDSProvider>
    </DSProvider>
  );
}
