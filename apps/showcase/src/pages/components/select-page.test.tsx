import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { SelectPage } from './select-page';

test('Select page shows Select and MultiSelect sections', () => {
  renderWithProvider(<SelectPage />);
  expect(screen.getByText('Select')).toBeInTheDocument();
  expect(screen.getByText('MultiSelect')).toBeInTheDocument();
});
