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
  // group cards
  expect(screen.getByText('Get started')).toBeInTheDocument();
});
