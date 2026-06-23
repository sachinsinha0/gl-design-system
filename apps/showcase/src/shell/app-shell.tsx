import { Outlet } from 'react-router-dom';
import { DSProvider, useActiveDS } from '../platform/ds-context';

/**
 * Picks the active DS's Shell — each DS owns its native chrome (Magna=Tamagui,
 * Jedi=MUI, GLDS-Web=HTML+CSS) and mounts its own Provider. Switching DS does
 * a hard reload (see useSetActiveDS) so only one DS's framework is mounted at
 * a time.
 */
function ActiveShell() {
  const ds = useActiveDS();
  const Shell = ds.Shell;
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export function AppShell() {
  return (
    <DSProvider>
      <ActiveShell />
    </DSProvider>
  );
}
