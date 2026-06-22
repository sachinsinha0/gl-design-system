import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { FeedPrototype } from './feed-prototype';

test('FeedPrototype renders the app-bar title', () => {
  renderWithProvider(<FeedPrototype />);
  expect(screen.getByText('Courses')).toBeInTheDocument();
});
