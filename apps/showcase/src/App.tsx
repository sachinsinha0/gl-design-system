import { RouterProvider } from 'react-router-dom';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider } from '@gl/elements';
import { router } from './router';
export function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </SafeAreaProvider>
  );
}
