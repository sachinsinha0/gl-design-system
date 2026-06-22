import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { SheetPage } from './sheet-page';

test('Sheet & Drawer page renders the Sheet section and a trigger button', () => {
  renderWithProvider(<SheetPage />);
  expect(screen.getByText('Sheet (bottom)')).toBeInTheDocument();
  expect(screen.getByText('Open sheet')).toBeInTheDocument();
});
