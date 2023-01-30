import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardsReducer from '../features/card-game/slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cardsApi } from '../services/cards';

export const store = configureStore({
  reducer: {
    cardGame: cardsReducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
