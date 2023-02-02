import '@testing-library/jest-dom';
import { server } from './mock/api/server';
import { cardsApi } from './features/card-game';
import { setupStore } from './app/store';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(cardsApi.util.resetApiState());
});

afterAll(() => server.close());
