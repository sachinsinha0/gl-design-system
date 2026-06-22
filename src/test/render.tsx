import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from '@gl/elements';
export function renderWithProvider(ui: ReactElement) {
  const wrapper = ({ children }: { children: ReactNode }) => <Provider>{children}</Provider>;
  return render(ui, { wrapper });
}
