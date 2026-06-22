import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { SelectionControlsPage } from './selection-controls-page';

test('Selection controls page shows all four control sections', () => {
  renderWithProvider(<SelectionControlsPage />);
  expect(screen.getByText('Checkbox')).toBeInTheDocument();
  expect(screen.getByText('RadioGroup')).toBeInTheDocument();
  expect(screen.getByText('Switch')).toBeInTheDocument();
});
