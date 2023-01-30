import { AppThunk } from '../../app/store';
import { CARD_GAME_TOP_SCORES } from './constants';
import { CardId } from '../../services/types';
import {
  addCardIdToMatched,
  addCardIdToUnderEvaluation,
  clearCardIdsMatched,
  clearCardIdsUnderEvaluation,
  clearCounter,
  clearSeconds,
  clearTop10Scores,
  incrementCounter,
  incrementNumberOfGamesPlayed,
  replaceTop10Scores,
} from './slice';

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
    dispatch(incrementCounter());
    dispatch(checkForMatch());
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

const checkForWin = (): AppThunk => async (dispatch, getState) => {
  const cards = getState().cardGame.cards;
  const cardIdsMatched = getState().cardGame.cardIdsMatched;
  const numberOfClicks = getState().cardGame.numberOfClicks;
  const seconds = getState().cardGame.seconds;
  console.log('cards length: ', cards.length);
  console.log('cardIdsMatched length: ', cardIdsMatched.length);
  if (cardIdsMatched.length === cards.length) {
    setTimeout(() => {
      alert(`You finished the game in ${numberOfClicks} clicks and ${seconds} seconds!`);
      dispatch(updateTop10Scores());
      dispatch(clearCounter());
      dispatch(clearSeconds());
      dispatch(clearCardIdsMatched());
      dispatch(incrementNumberOfGamesPlayed());
    }, 200);
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
