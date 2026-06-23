import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { TypographyPage } from './typography-page';

test('Typography page shows variants', () => {
  renderWithProvider(<TypographyPage />);
  expect(screen.getByText('Type scale')).toBeInTheDocument();
  expect(screen.getByText('body1')).toBeInTheDocument();
});
