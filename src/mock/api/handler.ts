import { rest } from 'msw';
import { BASE_URL, NEW_DECK_PATH } from '../../features/card-game/constants';
import { emptyState } from '../../utils/test-utils';

export const handlers = [
  rest.get(BASE_URL + NEW_DECK_PATH, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(emptyState), ctx.delay(30));
  }),
];
