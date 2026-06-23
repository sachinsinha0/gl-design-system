import { RouterProvider } from 'react-router-dom';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { router } from './router';
export function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RouterProvider router={router} />
    </SafeAreaProvider>
  );
}
