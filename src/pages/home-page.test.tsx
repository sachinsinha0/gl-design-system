import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../test/render';
import { HomePage } from './home-page';

test('Home page renders the hero, stats, and group cards', () => {
  renderWithProvider(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  expect(screen.getByText('The GL Design System')).toBeInTheDocument();
  expect(screen.getByText('Browse components')).toBeInTheDocument();
  // group cards
  expect(screen.getByText('Get started')).toBeInTheDocument();
});
