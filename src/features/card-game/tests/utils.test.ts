import { doubleCards, shuffleCards } from '../utils';

const cardsArray = [
  { code: 'code1', image: 'https://deckofcardsapi.com/static/img/AS.png', id: 0 },
  { code: 'code2', image: 'https://deckofcardsapi.com/static/img/2S.png', id: 1 },
  { code: 'code3', image: 'https://deckofcardsapi.com/static/img/3S.png', id: 2 },
  { code: 'code4', image: 'https://deckofcardsapi.com/static/img/4S.png', id: 3 },
  { code: 'code5', image: 'https://deckofcardsapi.com/static/img/5S.png', id: 4 },
];

describe('doubleCards', () => {
  const doubleCardsArray = doubleCards(cardsArray);

  it('cards array should include double the number of items', () => {
    expect(doubleCardsArray.length).toEqual(cardsArray.length * 2);
  });

  it('cards array should include all the original cards', () => {
    expect(doubleCardsArray).toEqual(expect.arrayContaining(cardsArray));
  });
});

describe('shuffleCards', () => {
  const shuffledCardsArray = shuffleCards(cardsArray);

  it('cards array should include the same number of items', () => {
    expect(shuffledCardsArray.length).toEqual(cardsArray.length);
  });

  it('cards array should include all the original cards', () => {
    expect(shuffledCardsArray).toEqual(expect.arrayContaining(cardsArray));
  });

  it('shuffled cards array should not be equal to the original cards array', () => {
    expect(shuffledCardsArray).not.toEqual(cardsArray);
  });
});
