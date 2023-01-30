import { RootState } from '../../app/store';
import { CardId } from '../../services/types';

export const selectIsFlipped = (state: RootState, cardId: CardId) =>
  state.cardGame.cardIdsUnderEvaluation.includes(cardId) ||
  state.cardGame.cardIdsMatched.includes(cardId);

export const selectTopScores = (state: RootState) => state.cardGame.top10Scores;

export const selectNumberOfGamesPlayed = (state: RootState) =>
  state.cardGame.numberOfGamesPlayed;

export const selectSeconds = (state: RootState) => state.cardGame.seconds;

export const selectNumberOfClicks = (state: RootState) =>
  state.cardGame.numberOfClicks;
