import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { IconsPage } from './icons-page';

test('Icons page shows Lucide and custom icon sections', () => {
  renderWithProvider(<IconsPage />);
  expect(screen.getByText('Lucide icons')).toBeInTheDocument();
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('PlayFilled')).toBeInTheDocument();
});
