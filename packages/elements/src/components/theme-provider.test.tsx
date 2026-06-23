import { render, screen } from '@testing-library/react';
import { Provider } from './provider';
import { Typography } from './typography';
test('renders children synchronously on first paint with empty storage', () => {
  localStorage.clear();
  render(<Provider><Typography variant="body1">hello-design-system</Typography></Provider>);
  expect(screen.getByText('hello-design-system')).toBeInTheDocument();
});
