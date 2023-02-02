export type CardId = number;

export interface ICard {
  code: string;
  image: string;
  id: CardId;
}

export interface DeckWithCards extends Deck {
  cards: ICard[];
}

interface Deck {
  success: boolean;
  deck_id: string;
  shuffled?: boolean;
  remaining: number;
}

export interface CardGameState {
  cards: ICard[];
  cardIdsUnderEvaluation: CardId[];
  cardIdsMatched: CardId[];
  numberOfClicks: number;
  seconds: number;
  top10ClickScores: number[];
  top10Times: number[];
  numberOfGamesPlayed: number;
}
