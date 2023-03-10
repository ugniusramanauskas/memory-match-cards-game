import { emptyState } from '../../../utils/testUtils';
import reducer, { addCardIdToMatched } from '../slice';

test('should handle a Card being added to an empty Matched list', () => {
  expect(reducer(emptyState, addCardIdToMatched(1))).toEqual({
    ...emptyState,
    cardIdsMatched: [1],
  });
});
