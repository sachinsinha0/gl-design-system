import { screen } from '@testing-library/react';
import { renderWithProvider } from '../test/render';
import { InfoCard } from './info-card';
import { ListItem } from './list-item';
import { ScreenAppBar } from './screen-app-bar';
import { EmptyState } from './empty-state';

test('InfoCard renders title and action', () => {
  renderWithProvider(<InfoCard title="Course" subtitle="Mentor" actionLabel="Open" />);
  expect(screen.getByText('Course')).toBeInTheDocument();
  expect(screen.getByText('Open')).toBeInTheDocument();
});

test('ListItem renders title and meta', () => {
  renderWithProvider(<ListItem title="Aanya Sharma" meta="Mentor" />);
  expect(screen.getByText('Aanya Sharma')).toBeInTheDocument();
  expect(screen.getByText('Mentor')).toBeInTheDocument();
});

test('ScreenAppBar renders the title', () => {
  renderWithProvider(<ScreenAppBar title="Courses" onBack={() => {}} />);
  expect(screen.getByText('Courses')).toBeInTheDocument();
});

test('EmptyState renders title and description', () => {
  renderWithProvider(<EmptyState title="Nothing here" description="Come back later" />);
  expect(screen.getByText('Nothing here')).toBeInTheDocument();
  expect(screen.getByText('Come back later')).toBeInTheDocument();
});
