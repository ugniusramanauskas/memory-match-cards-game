import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { CARD_GAME_TOP_SCORES } from '../../services/constants';
import { ICard, CardId } from '../../services/types';

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
      console.log('clearing cardIdsUnderEvaluation');
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

export const selectIsFlipped = (state: RootState, cardId: CardId) =>
  state.cardGame.cardIdsUnderEvaluation.includes(cardId) ||
  state.cardGame.cardIdsMatched.includes(cardId);

export const loadTop10Scores = (): AppThunk => (dispatch) => {
  const top10Scores = JSON.parse(localStorage.getItem(CARD_GAME_TOP_SCORES) || '[]');
  if (Array.isArray(top10Scores)) {
    dispatch(replaceTop10Scores(top10Scores));
  }
};

export const clickCard =
  (cardId: CardId): AppThunk =>
  (dispatch, getState) => {
    console.log('clicked card: ', cardId);
    const cardIdsUnderEvaluation = getState().cardGame.cardIdsUnderEvaluation;
    const cardIdsMatched = getState().cardGame.cardIdsMatched;
    if (
      !cardIdsUnderEvaluation.includes(cardId) &&
      !cardIdsMatched.includes(cardId) &&
      cardIdsUnderEvaluation.length < 2
    ) {
      dispatch(addCardIdToUnderEvaluation(cardId));
    }
    dispatch(checkForMatch());
    dispatch(incrementCounter());
    dispatch(checkForWin());
  };

const checkForMatch = (): AppThunk => (dispatch, getState) => {
  const cardIdsUnderEvaluation = getState().cardGame.cardIdsUnderEvaluation;
  console.log('cardIdsUnderEvaluation length: ', cardIdsUnderEvaluation.length);
  const cards = getState().cardGame.cards;
  if (cardIdsUnderEvaluation.length === 2) {
    const [cardId1, cardId2] = cardIdsUnderEvaluation;
    const card1 = cards.find((card) => card.id === cardId1);
    const card2 = cards.find((card) => card.id === cardId2);
    if (card1 && card2 && card1.code === card2.code) {
      dispatch(addCardIdToMatched(cardId1));
      dispatch(addCardIdToMatched(cardId2));
      dispatch(clearCardIdsUnderEvaluation());
    } else {
      setTimeout(() => dispatch(clearCardIdsUnderEvaluation()), 1000);
    }
  }
};

const checkForWin = (): AppThunk => (dispatch, getState) => {
  const cards = getState().cardGame.cards;
  const cardIdsMatched = getState().cardGame.cardIdsMatched;
  const numberOfClicks = getState().cardGame.numberOfClicks;
  const seconds = getState().cardGame.seconds;
  console.log('cards length: ', cards.length);
  console.log('cardIdsMatched length: ', cardIdsMatched.length);
  if (cardIdsMatched.length === cards.length) {
    alert(`You finished the game in ${numberOfClicks} clicks and ${seconds} seconds!`);
    dispatch(updateTop10Scores());
    dispatch(clearCounter());
    dispatch(clearSeconds());
    dispatch(clearCardIdsMatched());
    dispatch(incrementNumberOfGamesPlayed());
  }
};

const updateTop10Scores = (): AppThunk => (dispatch, getState) => {
  const numberOfClicks = getState().cardGame.numberOfClicks;
  const top10Scores = getState().cardGame.top10Scores;
  const newTopScores = [...top10Scores, numberOfClicks].sort((a, b) => a - b);
  const uniqueTopScores = [...new Set(newTopScores)];
  const top10ScoresToStore = uniqueTopScores.slice(0, 10);
  dispatch(clearTop10Scores());
  dispatch(replaceTop10Scores(top10ScoresToStore));
  localStorage.setItem(CARD_GAME_TOP_SCORES, JSON.stringify(top10ScoresToStore));
};

export default cardGameSlice.reducer;
