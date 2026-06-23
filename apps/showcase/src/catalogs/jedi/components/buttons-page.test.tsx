import { render, screen } from '@testing-library/react';
import { JediProvider } from '@gl/jedi';
import { ButtonsPage } from './buttons-page';

test('jedi buttons page renders contained/outlined/text variants', () => {
  render(
    <JediProvider>
      <ButtonsPage />
    </JediProvider>
  );
  expect(screen.getByText('Contained')).toBeInTheDocument();
  expect(screen.getByText('Outlined')).toBeInTheDocument();
  expect(screen.getByText('Text')).toBeInTheDocument();
});
