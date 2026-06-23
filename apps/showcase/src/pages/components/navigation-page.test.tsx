import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { NavigationPage } from './navigation-page';

test('Navigation page renders the App Bar section and a bottom nav label', () => {
  renderWithProvider(<NavigationPage />);
  expect(screen.getByText('App Bar')).toBeInTheDocument();
  // A BottomNavigationAction label and the Footer copy prove real demo content.
  expect(screen.getByText('Courses')).toBeInTheDocument();
  expect(screen.getByText('© 2026 Great Learning')).toBeInTheDocument();
});
