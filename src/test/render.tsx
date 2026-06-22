import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from '@gl/elements';
const TEST_METRICS = {
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
  frame: { x: 0, y: 0, width: 0, height: 0 }
};
export function renderWithProvider(ui: ReactElement) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <SafeAreaProvider initialMetrics={TEST_METRICS}>
      <Provider>{children}</Provider>
    </SafeAreaProvider>
  );
  return render(ui, { wrapper });
}
