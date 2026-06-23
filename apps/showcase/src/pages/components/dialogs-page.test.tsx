import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { DialogsPage } from './dialogs-page';

test('Dialogs page renders the Dialog section and a trigger button', () => {
  renderWithProvider(<DialogsPage />);
  expect(screen.getByText('Dialog')).toBeInTheDocument();
  expect(screen.getByText('Open dialog')).toBeInTheDocument();
});
