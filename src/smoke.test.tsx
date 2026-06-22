import { screen } from '@testing-library/react';
import { renderWithProvider } from './test/render';
import { Button } from '@gl/elements';
import { Home } from '@tamagui/lucide-icons';
test('a design-system Button renders with its label', () => {
  renderWithProvider(<Button variant="contained" startIcon={Home}>It renders</Button>);
  expect(screen.getByText('It renders')).toBeInTheDocument();
});
