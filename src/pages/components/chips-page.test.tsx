import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { ChipsPage } from './chips-page';

test('Chips page renders variants section and a chip label', () => {
  renderWithProvider(<ChipsPage />);
  expect(screen.getByText('Variants')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
});
