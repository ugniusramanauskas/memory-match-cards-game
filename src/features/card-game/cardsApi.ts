import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, NEW_DECK_PATH, DEFAULT_UNIQUE_CARD_COUNT } from './constants';
import type { DeckWithCards } from './types';

const envCardCount = Number(process.env.REACT_APP_UNIQUE_CARD_COUNT);
const uniqueCardCount = isNaN(envCardCount) ? DEFAULT_UNIQUE_CARD_COUNT : envCardCount;

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getDeckWithCards: builder.query<DeckWithCards, void>({
      query: () => {
        return {
          url: NEW_DECK_PATH + `?count=${uniqueCardCount}`,
        };
      },
    }),
  }),
});

export const { useGetDeckWithCardsQuery } = cardsApi;
