import { Outlet } from 'react-router-dom';
import { Provider as MagnaProvider, XStack, YStack, ScrollView } from '@gl/elements';
import { DSProvider } from '../platform/ds-context';
import { ActiveDSProvider } from '../platform/providers';
import { PageHeader } from '../platform/page-header';
import { Sidebar } from './sidebar';

function Shell() {
  return (
    <XStack height="100vh" backgroundColor="$surface">
      <Sidebar />
      <YStack flex={1} backgroundColor="$background">
        <ScrollView
          flex={1}
          contentContainerStyle={{
            paddingHorizontal: 40,
            paddingVertical: 36,
            alignItems: 'center'
          }}
        >
          <YStack width="100%" maxWidth={1180}>
            <PageHeader />
            {/* The shell chrome is Magna; the active DS provider wraps only the route content so
                non-Magna routes (Jedi MUI, GLDS-Web HTML+CSS) still get their styling context
                without the shell needing two stacked theme providers. */}
            <ActiveDSProvider>
              <Outlet />
            </ActiveDSProvider>
          </YStack>
        </ScrollView>
      </YStack>
    </XStack>
  );
}

export function AppShell() {
  return (
    <DSProvider>
      <MagnaProvider>
        <Shell />
      </MagnaProvider>
    </DSProvider>
  );
}
