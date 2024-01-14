import { render, screen } from '@testing-library/react';
import { App } from './App';

it('renders welcome message', () => {
  render(<App />);
  expect(screen.getByTestId('app-title')).toBeInTheDocument();
});