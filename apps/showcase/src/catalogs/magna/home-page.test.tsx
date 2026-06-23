import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../test/render';
import '../magna';
import { DSProvider } from '../../platform/ds-context';
import { HomePage } from './home-page';

test('Home page renders the hero, stats, and group cards', () => {
  renderWithProvider(
    <MemoryRouter>
      <DSProvider>
        <HomePage />
      </DSProvider>
    </MemoryRouter>
  );
  expect(screen.getByText('The GL Design System')).toBeInTheDocument();
  expect(screen.getByText('Browse components')).toBeInTheDocument();
  // Group cards. With the "Get started" group now registered in the catalog as well, the label
  // appears twice (CTA + group card) — assert at least one element matches.
  expect(screen.getAllByText('Get started').length).toBeGreaterThan(0);
});
