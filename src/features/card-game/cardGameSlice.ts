import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { ICard, CardId } from '../../services/types';

export interface CardGameState {
  cards: ICard[];
  cardIdsUnderEvaluation: CardId[];
  cardIdsMatched: CardId[];
  numberOfClicks: number;
}

const initialState: CardGameState = {
  cards: [],
  cardIdsUnderEvaluation: [],
  cardIdsMatched: [],
  numberOfClicks: 0,
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
    addCardIdToMatched: (state, action: PayloadAction<CardId>) => {
      state.cardIdsMatched.push(action.payload);
    },
    clearCardIdsUnderEvaluation: (state) => {
      console.log('clearing cardIdsUnderEvaluation');
      state.cardIdsUnderEvaluation = [];
    },
    incrementCounter: (state) => {
      state.numberOfClicks += 1;
    },
    clearCounter: (state) => {
      state.numberOfClicks = 0;
    },
  },
});

export const {
  addCardsToState,
  addCardIdToUnderEvaluation,
  addCardIdToMatched,
  clearCardIdsUnderEvaluation,
  incrementCounter,
  clearCounter,
} = cardGameSlice.actions;

export const selectIsFlipped = (state: RootState, cardId: CardId) =>
  state.cardGame.cardIdsUnderEvaluation.includes(cardId) ||
  state.cardGame.cardIdsMatched.includes(cardId);

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
  console.log('cards length: ', cards.length);
  console.log('cardIdsMatched length: ', cardIdsMatched.length);
  if (cardIdsMatched.length === cards.length) {
    alert('You win!');
    dispatch(clearCounter());
  }
};

export default cardGameSlice.reducer;
