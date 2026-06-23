import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { ColorsPage } from './colors-page';

test('Colors page shows grouped role tokens with their on- pairs', () => {
  renderWithProvider(<ColorsPage />);
  expect(screen.getByText('Primary')).toBeInTheDocument();
  expect(screen.getByText('primary')).toBeInTheDocument();
  expect(screen.getByText('onPrimaryContainer')).toBeInTheDocument();
  expect(screen.getByText('Surfaces')).toBeInTheDocument();
});
