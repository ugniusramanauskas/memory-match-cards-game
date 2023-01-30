import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetDeckWithCardsQuery } from '../../services/cards';
import { addCardsToState, clearSeconds } from './slice';
import { loadTop10Scores } from './thunks';

export const useLoadCards = () => {
  const { data, error, isLoading, refetch } = useGetDeckWithCardsQuery();
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
