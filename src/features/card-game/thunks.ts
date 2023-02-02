import { AppThunk } from '../../app/store';
import { CARD_GAME_TOP_CLICK_SCORES, CARD_GAME_TOP_TIMES } from './constants';
import { CardId } from './types';
import {
  addCardIdToMatched,
  addCardIdToUnderEvaluation,
  clearCardIdsMatched,
  clearCardIdsUnderEvaluation,
  clearCounter,
  clearSeconds,
  clearTop10ClickScores,
  clearTop10Times,
  incrementCounter,
  incrementNumberOfGamesPlayed,
  replaceTop10ClickScores,
  replaceTop10Times,
} from './slice';

export const clickCard =
  (cardId: CardId): AppThunk =>
  (dispatch, getState) => {
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
  if (cardIdsMatched.length === cards.length) {
    setTimeout(() => {
      alert(`You finished the game in ${numberOfClicks} clicks and ${seconds} seconds!`);
      dispatch(updateTop10Scores());
      dispatch(updateTop10Times());
      dispatch(clearCounter());
      dispatch(clearSeconds());
      dispatch(clearCardIdsMatched());
      dispatch(incrementNumberOfGamesPlayed());
    }, 200);
  }
};

const updateTop10Scores = (): AppThunk => (dispatch, getState) => {
  const numberOfClicks = getState().cardGame.numberOfClicks;
  const top10ClickScores = getState().cardGame.top10ClickScores;
  const newTopScores = [...top10ClickScores, numberOfClicks].sort((a, b) => a - b);
  const uniqueTopScores = [...new Set(newTopScores)];
  const top10ClickScoresToStore = uniqueTopScores.slice(0, 10);
  dispatch(clearTop10ClickScores());
  dispatch(replaceTop10ClickScores(top10ClickScoresToStore));
  localStorage.setItem(CARD_GAME_TOP_CLICK_SCORES, JSON.stringify(top10ClickScoresToStore));
};

const updateTop10Times = (): AppThunk => (dispatch, getState) => {
  const seconds = getState().cardGame.seconds;
  const top10Times = getState().cardGame.top10Times;
  const newTopTimes = [...top10Times, seconds].sort((a, b) => a - b);
  const uniqueTopTimes = [...new Set(newTopTimes)];
  const top10TimesToStore = uniqueTopTimes.slice(0, 10);
  dispatch(clearTop10Times());
  dispatch(replaceTop10Times(top10TimesToStore));
  localStorage.setItem(CARD_GAME_TOP_TIMES, JSON.stringify(top10TimesToStore));
};

export const loadTop10ClickScores = (): AppThunk => (dispatch) => {
  const top10ClickScores = JSON.parse(localStorage.getItem(CARD_GAME_TOP_CLICK_SCORES) || '[]');
  if (Array.isArray(top10ClickScores)) {
    dispatch(replaceTop10ClickScores(top10ClickScores));
  }
};

export const loadTop10Times = (): AppThunk => (dispatch) => {
  const top10Times = JSON.parse(localStorage.getItem(CARD_GAME_TOP_TIMES) || '[]');
  if (Array.isArray(top10Times)) {
    dispatch(replaceTop10Times(top10Times));
  }
};
