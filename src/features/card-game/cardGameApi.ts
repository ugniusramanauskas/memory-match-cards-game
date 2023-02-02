import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, DEFAULT_CARD_COUNT } from './constants';
import type { DeckWithCards } from './types';

const UNIQUE_CARD_COUNT = (Number(process.env.REACT_APP_CARD_COUNT) ?? DEFAULT_CARD_COUNT) / 2;

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getDeckWithCards: builder.query<DeckWithCards, void>({
      query: () => {
        return {
          url: `new/draw/?count=${UNIQUE_CARD_COUNT}`,
        };
      },
    }),
  }),
});

export const { useGetDeckWithCardsQuery } = cardsApi;
