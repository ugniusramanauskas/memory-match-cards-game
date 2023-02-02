import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { App } from './App';
import { renderWithProviders } from './utils/test-utils';

export const handlers = [
  rest.get('https://deckofcardsapi.com/api/deck/new/draw/', (req, res, ctx) => {
    return res(ctx.json('John Smith'), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('renders Memory Game title', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/Memory Game/i);
  expect(linkElement).toBeInTheDocument();
});
