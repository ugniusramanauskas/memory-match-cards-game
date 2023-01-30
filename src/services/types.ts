interface Images {
  svg: string;
  png: string;
}

export type CardId = number;
export interface ICard {
  code: string;
  image: string;
  images: Images;
  value: string;
  suit: string;
  id: CardId;
}

export interface DeckWithCards extends IDeck {
  cards: ICard[];
}

interface IDeck {
  success: boolean;
  deck_id: string;
  shuffled?: boolean;
  remaining: number;
}
