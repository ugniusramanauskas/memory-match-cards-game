import { rest } from 'msw';
import { BASE_URL, NEW_DECK_PATH } from '../../features/card-game';
import { emptyState } from '../../utils/testUtils';

export const handlers = [
  rest.get(BASE_URL + NEW_DECK_PATH, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(emptyState), ctx.delay(30));
  }),
];
