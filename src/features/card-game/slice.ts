import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard, CardId, CardGameState } from './types';

const initialState: CardGameState = {
  cards: [],
  cardIdsUnderEvaluation: [],
  cardIdsMatched: [],
  numberOfClicks: 0,
  seconds: 0,
  top10ClickScores: [],
  top10Times: [],
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
    replaceTop10ClickScores: (state, action: PayloadAction<number[]>) => {
      state.top10ClickScores = action.payload;
    },
    replaceTop10Times: (state, action: PayloadAction<number[]>) => {
      state.top10Times = action.payload;
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
  replaceTop10ClickScores,
  replaceTop10Times,
  incrementNumberOfGamesPlayed,
} = cardGameSlice.actions;

export default cardGameSlice.reducer;
