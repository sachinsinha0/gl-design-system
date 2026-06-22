import { RouterProvider } from 'react-router-dom';
import { Provider } from '@gl/elements';
import { router } from './router';
export function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}
