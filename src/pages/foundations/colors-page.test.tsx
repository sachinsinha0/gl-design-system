import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { ColorsPage } from './colors-page';

test('Colors page shows semantic token swatches', () => {
  renderWithProvider(<ColorsPage />);
  expect(screen.getByText('Semantic tokens')).toBeInTheDocument();
  expect(screen.getByText('primary')).toBeInTheDocument();
});
