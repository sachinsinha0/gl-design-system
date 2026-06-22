import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { AccordionPage } from './accordion-page';

test('Accordion page renders the Basic section and an accordion header', () => {
  renderWithProvider(<AccordionPage />);
  expect(screen.getByText('Basic')).toBeInTheDocument();
  expect(screen.getByText('What is the design system?')).toBeInTheDocument();
});
