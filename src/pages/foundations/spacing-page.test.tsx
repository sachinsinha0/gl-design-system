import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { SpacingPage } from './spacing-page';

test('Spacing page shows spacing scale', () => {
  renderWithProvider(<SpacingPage />);
  expect(screen.getByText('Spacing scale')).toBeInTheDocument();
  expect(screen.getByText('$2 · 16px')).toBeInTheDocument();
});
