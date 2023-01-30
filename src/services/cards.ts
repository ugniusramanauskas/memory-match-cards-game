import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './constants';
import type { DeckWithCards } from './types';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getDeckWithCards: builder.query<DeckWithCards, number>({
      query: (count) => {
        return {
          url: `new/draw/?count=${count}`,
        };
      },
    }),
  }),
});

export const { useGetDeckWithCardsQuery } = cardsApi;
