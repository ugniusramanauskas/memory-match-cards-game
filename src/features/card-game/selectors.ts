import { RootState } from '../../app/store';
import { CardId } from '../../services/types';

export const selectIsFlipped = (state: RootState, cardId: CardId) =>
  state.cardGame.cardIdsUnderEvaluation.includes(cardId) ||
  state.cardGame.cardIdsMatched.includes(cardId);
