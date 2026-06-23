import { screen } from '@testing-library/react';
import { renderWithProvider } from '../test/render';
import { DemoBlock } from './demo-block';
import { Typography } from '@gl/elements';
test('DemoBlock renders its title and children', () => {
  renderWithProvider(
    <DemoBlock title="Buttons" description="All button variants">
      <Typography variant="body1">child-content</Typography>
    </DemoBlock>
  );
  expect(screen.getByText('Buttons')).toBeInTheDocument();
  expect(screen.getByText('child-content')).toBeInTheDocument();
});
