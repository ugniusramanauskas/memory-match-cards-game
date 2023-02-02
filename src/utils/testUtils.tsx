import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../app/store';
import { setupStore } from '../app/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const emptyState = {
  cards: [],
  cardIdsUnderEvaluation: [],
  cardIdsMatched: [],
  numberOfClicks: 0,
  seconds: 0,
  top10ClickScores: [],
  top10Times: [],
  numberOfGamesPlayed: 0,
};
// const initialState = {
//   cards: [
//     {
//       code: 'AS',
//       image: 'https://deckofcardsapi.com/static/img/AS.png',
//     },
//     {
//       code: '0D',
//       image: 'https://deckofcardsapi.com/static/img/0D.png',
//     },
//   ],
// };
