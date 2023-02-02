import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { setupStore } from '../../../app/store';
import { emptyState, renderWithProviders } from '../../../utils/test-utils';
import { GENERIC_BACK_OF_CARD_IMAGE } from '../constants';
import { clickCard } from '../thunks';
import { Card } from './Card';

export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
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

test('Test card showing back side', () => {
  const TEST_CODE = 'AS';
  const CARD_ID = 0;
  const initialCardGame = {
    ...emptyState,
    cards: [
      {
        code: TEST_CODE,
        image: 'https://deckofcardsapi.com/static/img/AS.png',
        id: CARD_ID,
      },
    ],
  };
  const preloadedState = {
    cardGame: initialCardGame,
  };

  const { getByAltText } = renderWithProviders(<Card card={initialCardGame.cards[CARD_ID]} />, {
    preloadedState,
  });
  const cardShowingBackSideImage = getByAltText(new RegExp(TEST_CODE, 'i'));
  expect(cardShowingBackSideImage).toBeInTheDocument();
  expect(cardShowingBackSideImage).toHaveAttribute('src', GENERIC_BACK_OF_CARD_IMAGE);
});

test('Test card showing front side', () => {
  const TEST_CODE = 'AS';
  const CARD_ID = 0;
  const initialCardGame = {
    ...emptyState,
    cards: [
      {
        code: TEST_CODE,
        image: 'https://deckofcardsapi.com/static/img/AS.png',
        id: CARD_ID,
      },
    ],
  };
  const preloadedState = {
    cardGame: initialCardGame,
  };
  const store = setupStore(preloadedState);
  store.dispatch(clickCard(CARD_ID));

  const { getByAltText } = renderWithProviders(<Card card={initialCardGame.cards[CARD_ID]} />, {
    store,
  });
  const cardShowingFrontSideImage = getByAltText(new RegExp(TEST_CODE, 'i'));
  expect(cardShowingFrontSideImage).toBeInTheDocument();
  expect(cardShowingFrontSideImage).toHaveAttribute('src', initialCardGame.cards[CARD_ID].image);
});
