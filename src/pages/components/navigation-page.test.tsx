import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { NavigationPage } from './navigation-page';

test('Navigation page renders the App Bar section and a bottom nav label', () => {
  renderWithProvider(<NavigationPage />);
  expect(screen.getByText('App Bar')).toBeInTheDocument();
  expect(screen.getByText('Courses')).toBeInTheDocument();
});
