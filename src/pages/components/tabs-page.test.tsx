import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { TabsPage } from './tabs-page';

test('Tabs page renders the Basic section and a tab label', () => {
  renderWithProvider(<TabsPage />);
  expect(screen.getByText('Basic')).toBeInTheDocument();
  expect(screen.getAllByText('Overview').length).toBeGreaterThan(0);
});
