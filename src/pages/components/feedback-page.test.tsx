import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { FeedbackPage } from './feedback-page';

test('Feedback page renders the Alert section and an alert message', () => {
  renderWithProvider(<FeedbackPage />);
  expect(screen.getByText('Alert')).toBeInTheDocument();
  expect(screen.getByText('This is a info standard alert.')).toBeInTheDocument();
});
