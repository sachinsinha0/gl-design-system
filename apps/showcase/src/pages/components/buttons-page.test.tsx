import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { ButtonsPage } from './buttons-page';

test('Buttons page shows variant, size and icon-button sections', () => {
  renderWithProvider(<ButtonsPage />);
  expect(screen.getByText('Variants')).toBeInTheDocument();
  expect(screen.getByText('Sizes')).toBeInTheDocument();
  expect(screen.getByText('IconButtons')).toBeInTheDocument();
});
