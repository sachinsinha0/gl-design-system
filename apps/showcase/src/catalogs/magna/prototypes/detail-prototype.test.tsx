import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { DetailPrototype } from './detail-prototype';

test('DetailPrototype renders the course title', () => {
  renderWithProvider(<DetailPrototype />);
  expect(screen.getByText('Intro to Data Science')).toBeInTheDocument();
});
