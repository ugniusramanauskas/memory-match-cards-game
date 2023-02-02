import { screen } from '@testing-library/react';
import { App } from './App';
import { renderWithProviders } from './utils/testUtils';

test('renders Memory Game title', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/Memory Game/i);
  expect(linkElement).toBeInTheDocument();
});
