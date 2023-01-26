interface Images {
  svg: string;
  png: string;
}

interface Card {
  code: string;
  image: string;
  images: Images;
  value: string;
  suit: string;
}

export interface DeckWithCards extends Deck {
  cards: Card[];
}

export interface Deck {
  success: boolean;
  deck_id: string;
  shuffled?: boolean;
  remaining: number;
}
