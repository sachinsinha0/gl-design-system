import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../test/render';
import '../catalogs/magna';
import { DSProvider } from '../platform/ds-context';
import { Sidebar } from './sidebar';
test('sidebar lists the group labels', () => {
  renderWithProvider(
    <MemoryRouter>
      <DSProvider>
        <Sidebar />
      </DSProvider>
    </MemoryRouter>
  );
  expect(screen.getByText('Foundations')).toBeInTheDocument();
  expect(screen.getByText('Components')).toBeInTheDocument();
  expect(screen.getByText('Prototypes')).toBeInTheDocument();
});
