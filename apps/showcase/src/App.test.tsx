import { render, screen } from '@testing-library/react';
import { App } from './App';
test('app boots and shows the shell', async () => {
  render(<App />);
  // The sidebar header is the DS switcher; the active DS label is the first thing rendered.
  expect(await screen.findByLabelText(/switch design system/i)).toBeInTheDocument();
});
