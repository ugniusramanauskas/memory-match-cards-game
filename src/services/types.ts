interface Images {
  svg: string;
  png: string;
}

export interface ICard {
  code: string;
  image: string;
  images: Images;
  value: string;
  suit: string;
}

export interface DeckWithCards extends IDeck {
  cards: ICard[];
}

export interface IDeck {
  success: boolean;
  deck_id: string;
  shuffled?: boolean;
  remaining: number;
}
