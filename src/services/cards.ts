import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DeckWithCards, Deck } from './types';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://deckofcardsapi.com/api/deck/' }),
  endpoints: (builder) => ({
    getNewDeckId: builder.query<Deck, void>({
      query: () => 'new/shuffle/?deck_count=1',
    }),
    getDeckWithCards: builder.query<DeckWithCards, string>({
      query: (deck_id) => {
        return {
          url: `${deck_id}/draw/?count=2`,
        };
      },
    }),
  }),
});

export const { useGetNewDeckIdQuery, useGetDeckWithCardsQuery } = cardsApi;
