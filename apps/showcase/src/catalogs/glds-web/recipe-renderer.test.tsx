import { render, screen, waitFor } from '@testing-library/react';
import { RecipeRenderer } from './recipe-renderer';
test('GLDS recipe renderer loads the button recipe', async () => {
  render(<RecipeRenderer id="button" />);
  await waitFor(() => expect(screen.getByText('PREVIEW')).toBeInTheDocument());
});
