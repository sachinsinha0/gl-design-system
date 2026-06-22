import { render, screen } from '@testing-library/react';
import { App } from './App';
test('app boots and shows the shell', async () => {
  render(<App />);
  expect(await screen.findByText('GL Design')).toBeInTheDocument();
});
