import { setupStore } from '../../../app/store';
import { emptyState, renderWithProviders } from '../../../utils/test-utils';
import { GENERIC_BACK_OF_CARD_IMAGE } from '../constants';
import { clickCard } from '../thunks';
import { Card } from '../components/Card';

const TEST_CODE = 'AS';
const CARD_ID = 0;
const initialCardGame = {
  ...emptyState,
  cards: [{ code: TEST_CODE, image: 'https://deckofcardsapi.com/static/img/AS.png', id: CARD_ID }],
};
const preloadedState = {
  cardGame: initialCardGame,
};

test('Test card showing back side', () => {
  const { getByAltText } = renderWithProviders(<Card card={initialCardGame.cards[CARD_ID]} />, {
    preloadedState,
  });
  const cardShowingBackSideImage = getByAltText(new RegExp(TEST_CODE, 'i'));
  expect(cardShowingBackSideImage).toBeInTheDocument();
  expect(cardShowingBackSideImage).toHaveAttribute('src', GENERIC_BACK_OF_CARD_IMAGE);
});

test('Test card showing front side', () => {
  const store = setupStore(preloadedState);
  store.dispatch(clickCard(CARD_ID));

  const { getByAltText } = renderWithProviders(<Card card={initialCardGame.cards[CARD_ID]} />, {
    store,
  });
  const cardShowingFrontSideImage = getByAltText(new RegExp(TEST_CODE, 'i'));
  expect(cardShowingFrontSideImage).toBeInTheDocument();
  expect(cardShowingFrontSideImage).toHaveAttribute('src', initialCardGame.cards[CARD_ID].image);
});
