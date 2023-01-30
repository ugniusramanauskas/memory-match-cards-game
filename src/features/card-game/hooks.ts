import { useEffect, useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetNewDeckIdQuery, useGetDeckWithCardsQuery } from '../../services/cards';
import { addCardsToState, clearSeconds } from './slice';
import { loadTop10Scores } from './thunks';

export const useGetCards = () => {
  const useCombinedGetCardsQuery = () => {
    const { data: deckIdData } = useGetNewDeckIdQuery();
    const { deck_id } = deckIdData || {};
    const {
      data: deckWithCardsData,
      error,
      isLoading,
      refetch,
    } = useGetDeckWithCardsQuery(deck_id ?? skipToken);
    return { deckWithCardsData, error, isLoading, refetch };
  };
  const { deckWithCardsData: data, error, isLoading, refetch } = useCombinedGetCardsQuery();
  const { cards } = data || {};
  const shuffledCards = useMemo(() => {
    if (!cards || cards?.length === 0) return [];
    const doubleCards = [...cards, ...cards];
    const doubleCardsWithIds = doubleCards.map((card, index) => ({
      ...card,
      id: index,
    }));
    return doubleCardsWithIds.sort(() => 0.5 - Math.random());
  }, [cards]);

  const numberOfGamesPlayed = useAppSelector((state) => state.cardGame.numberOfGamesPlayed);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (numberOfGamesPlayed === 0) return;
    refetch();
  }, [numberOfGamesPlayed, refetch]);

  useEffect(() => {
    dispatch(addCardsToState(shuffledCards));
    dispatch(clearSeconds());
  }, [dispatch, shuffledCards]);

  useEffect(() => {
    dispatch(loadTop10Scores());
  }, [dispatch]);

  return { cards: shuffledCards, error, isLoading };
};
