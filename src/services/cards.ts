import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DeckWithCards } from './types';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://deckofcardsapi.com/api/deck/' }),
  endpoints: (builder) => ({
    getDeckWithCards: builder.query<DeckWithCards, void>({
      query: () => {
        return {
          url: `new/draw/?count=3`,
        };
      },
    }),
  }),
});

export const { useGetDeckWithCardsQuery } = cardsApi;
