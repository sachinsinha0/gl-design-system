import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { AppShell } from './shell/app-shell';
import './catalogs/magna';
import './catalogs/jedi';
import './catalogs/glds-web';
import { listDesignSystems } from './platform/ds-registry';

function buildDSChildren(): RouteObject[] {
  return listDesignSystems().map((ds) => {
    const children: RouteObject[] = [];
    if (ds.homePage) {
      const HomeComponent = ds.homePage;
      children.push({ index: true, element: <HomeComponent /> });
    }
    for (const group of ds.registry) {
      for (const entry of group.entries) {
        const EntryComponent = entry.Component;
        children.push({ path: entry.slug, element: <EntryComponent /> });
      }
    }
    return { path: ds.id, children };
  });
}

const defaultDsId = listDesignSystems()[0]?.id ?? 'magna';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to={`/${defaultDsId}`} replace /> },
      ...buildDSChildren()
    ]
  }
]);
