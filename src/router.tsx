import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './shell/app-shell';
import { catalog, allEntries } from './catalog/registry';
const firstSlug = allEntries()[0]?.slug ?? 'colors';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to={`/${firstSlug}`} replace /> },
      ...catalog.flatMap((group) => group.entries.map((entry) => ({ path: entry.slug, element: <entry.Component /> })))
    ]
  }
]);
