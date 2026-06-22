import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './shell/app-shell';
import { HomePage } from './pages/home-page';
import { catalog } from './catalog/registry';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      ...catalog.flatMap((group) =>
        group.entries.map((entry) => ({ path: entry.slug, element: <entry.Component /> }))
      )
    ]
  }
]);
