import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { InputsPage } from './inputs-page';

test('Inputs page shows TextField and TextArea sections', () => {
  renderWithProvider(<InputsPage />);
  expect(screen.getByText('TextField')).toBeInTheDocument();
  expect(screen.getByText('TextArea')).toBeInTheDocument();
});
