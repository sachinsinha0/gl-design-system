import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { LoginPrototype } from './login-prototype';

test('LoginPrototype renders the Sign in action', () => {
  renderWithProvider(<LoginPrototype />);
  expect(screen.getByText('Sign in')).toBeInTheDocument();
});
