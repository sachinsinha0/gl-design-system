import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { GridPage } from './grid-page';

test('Grid page renders the two-column section and a grid cell label', () => {
  renderWithProvider(<GridPage />);
  expect(screen.getByText('Two-column layout')).toBeInTheDocument();
  expect(screen.getByText('lg=8 (main)')).toBeInTheDocument();
});
