import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../test/render';
import '../catalogs/magna';
import '../catalogs/jedi';
import '../catalogs/glds-web';
import { DSProvider } from '../platform/ds-context';
import { TopBar } from './top-bar';

test('top bar search shows results matching the query', async () => {
  const user = userEvent.setup();
  renderWithProvider(
    <MemoryRouter>
      <DSProvider>
        <TopBar />
      </DSProvider>
    </MemoryRouter>
  );
  const input = screen.getByRole('searchbox', { name: /search design systems/i });
  await user.type(input, 'button');
  const dropdown = await screen.findByRole('listbox');
  expect(dropdown).toBeInTheDocument();
  const options = within(dropdown).getAllByRole('option');
  expect(options.length).toBeGreaterThan(0);
});
