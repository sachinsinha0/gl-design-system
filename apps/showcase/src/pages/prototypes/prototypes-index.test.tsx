import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../../test/render';
import { PrototypesIndex } from './prototypes-index';

test('PrototypesIndex renders the intro heading', () => {
  renderWithProvider(
    <MemoryRouter>
      <PrototypesIndex />
    </MemoryRouter>
  );
  expect(screen.getByText('Prototypes')).toBeInTheDocument();
});
