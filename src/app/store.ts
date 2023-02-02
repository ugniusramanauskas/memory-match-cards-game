import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import cardsReducer from '../features/card-game/slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cardsApi } from '../features/card-game/cardGameApi';

const rootReducer = combineReducers({
  cardGame: cardsReducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsApi.middleware),
  });
};

setupListeners(setupStore().dispatch);

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
