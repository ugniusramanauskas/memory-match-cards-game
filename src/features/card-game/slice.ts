import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard, CardId } from './types';

export interface CardGameState {
  cards: ICard[];
  cardIdsUnderEvaluation: CardId[];
  cardIdsMatched: CardId[];
  numberOfClicks: number;
  seconds: number;
  top10Scores: number[];
  numberOfGamesPlayed: number;
}

const initialState: CardGameState = {
  cards: [],
  cardIdsUnderEvaluation: [],
  cardIdsMatched: [],
  numberOfClicks: 0,
  seconds: 0,
  top10Scores: [],
  numberOfGamesPlayed: 0,
};

export const cardGameSlice = createSlice({
  name: 'cardGame',
  initialState,
  reducers: {
    addCardsToState: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
    addCardIdToUnderEvaluation: (state, action: PayloadAction<CardId>) => {
      state.cardIdsUnderEvaluation.push(action.payload);
    },
    clearCardIdsUnderEvaluation: (state) => {
      state.cardIdsUnderEvaluation = [];
    },
    addCardIdToMatched: (state, action: PayloadAction<CardId>) => {
      state.cardIdsMatched.push(action.payload);
    },
    clearCardIdsMatched: (state) => {
      state.cardIdsMatched = [];
    },
    incrementCounter: (state) => {
      state.numberOfClicks += 1;
    },
    clearCounter: (state) => {
      state.numberOfClicks = 0;
    },
    incrementSeconds: (state) => {
      state.seconds += 1;
    },
    clearSeconds: (state) => {
      state.seconds = 0;
    },
    replaceTop10Scores: (state, action: PayloadAction<number[]>) => {
      state.top10Scores = action.payload;
    },
    clearTop10Scores: (state) => {
      state.top10Scores = [];
    },
    incrementNumberOfGamesPlayed: (state) => {
      state.numberOfGamesPlayed += 1;
    },
  },
});

export const {
  addCardsToState,
  addCardIdToUnderEvaluation,
  clearCardIdsUnderEvaluation,
  addCardIdToMatched,
  clearCardIdsMatched,
  incrementCounter,
  clearCounter,
  incrementSeconds,
  clearSeconds,
  clearTop10Scores,
  replaceTop10Scores,
  incrementNumberOfGamesPlayed,
} = cardGameSlice.actions;

export default cardGameSlice.reducer;
