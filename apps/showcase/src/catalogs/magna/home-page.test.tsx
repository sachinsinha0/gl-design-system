import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../test/render';
import '../magna';
import { DSProvider } from '../../platform/ds-context';
import { HomePage } from './home-page';

test('Home page renders the hero and install block', () => {
  renderWithProvider(
    <MemoryRouter>
      <DSProvider>
        <HomePage />
      </DSProvider>
    </MemoryRouter>
  );
  expect(screen.getByText('Magna Design System')).toBeInTheDocument();
  expect(screen.getByText('Install')).toBeInTheDocument();
});
