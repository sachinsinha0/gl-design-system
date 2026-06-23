import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../../test/render';
import { FeedPrototype } from './feed-prototype';

test('FeedPrototype renders the learner dashboard', () => {
  renderWithProvider(
    <MemoryRouter>
      <FeedPrototype />
    </MemoryRouter>
  );
  expect(screen.getByText('Continue learning')).toBeInTheDocument();
  expect(screen.getByText('My courses')).toBeInTheDocument();
});
