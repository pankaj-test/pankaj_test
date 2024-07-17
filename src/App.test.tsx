import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading universities', () => {
  render(<App />);
  const linkElement = screen.getByText(/Universities/i);
  expect(linkElement).toBeInTheDocument();
});