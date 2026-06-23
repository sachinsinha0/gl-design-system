import { screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../test/render';
import '../catalogs/magna';
import { DSProvider } from '../platform/ds-context';
import { ThemeSwitcher } from './theme-switcher';

// The DS Button renders as a Tamagui frame (no native `button` role / tabindex),
// and its `onPress` handler is bound at the text layer. We drive it by clicking
// the visible label text and assert the label flips Dark <-> Light.
test('toggles color scheme label between Dark and Light', () => {
  renderWithProvider(
    <MemoryRouter>
      <DSProvider>
        <ThemeSwitcher />
      </DSProvider>
    </MemoryRouter>
  );
  const dark = screen.getByText('Dark');
  expect(dark).toBeInTheDocument();
  fireEvent.click(dark);
  expect(screen.getByText('Light')).toBeInTheDocument();
  expect(screen.queryByText('Dark')).not.toBeInTheDocument();
});
