import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { DataDisplayPage } from './data-display-page';

test('Data display page renders the Avatar section and a breadcrumb item', () => {
  renderWithProvider(<DataDisplayPage />);
  expect(screen.getByText('Avatar')).toBeInTheDocument();
  expect(screen.getByText('Data Science')).toBeInTheDocument();
  // The avatar-less person (Priya Nair) renders an initials fallback ("PN"),
  // proving real demo content beyond the DemoBlock headers.
  expect(screen.getByText('PN')).toBeInTheDocument();
});
