import { ICard } from './types';

export const doubleCards = (cards: ICard[]) => {
  return [...cards, ...cards];
};

export const shuffleCards = (cards: ICard[]) => {
  return [...cards].sort(() => 0.5 - Math.random());
};

export const addIdsToCards = (cards: ICard[]) => {
  return cards.map((card, index) => ({ ...card, id: index }));
};

export const preloadImages = (cards: ICard[]) => {
  cards.forEach((card) => {
    const img = new Image();
    img.src = card.image;
  });
};
