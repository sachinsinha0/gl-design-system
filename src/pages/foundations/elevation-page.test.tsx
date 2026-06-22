import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { ElevationPage } from './elevation-page';

test('Elevation page shows shadow levels', () => {
  renderWithProvider(<ElevationPage />);
  expect(screen.getByText('Elevation')).toBeInTheDocument();
  expect(screen.getByText('md')).toBeInTheDocument();
});
