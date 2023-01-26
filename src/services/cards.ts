import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DeckWithCards, IDeck } from './types';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://deckofcardsapi.com/api/deck/' }),
  endpoints: (builder) => ({
    getNewDeckId: builder.query<IDeck, void>({
      query: () => 'new/shuffle/?deck_count=1',
    }),
    getDeckWithCards: builder.query<DeckWithCards, string>({
      query: (deck_id) => {
        return {
          url: `${deck_id}/draw/?count=3`,
        };
      },
    }),
  }),
});

export const { useGetNewDeckIdQuery, useGetDeckWithCardsQuery } = cardsApi;
