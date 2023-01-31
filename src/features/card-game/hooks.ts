import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetDeckWithCardsQuery } from '../../services/cards';
import { selectNumberOfGamesPlayed, selectSeconds } from './selectors';
import { addCardsToState, incrementSeconds } from './slice';
import { loadTop10Scores } from './thunks';
import { addIdsToCards, doubleCards, preloadImages, shuffleCards } from './utils';

export const useLoadCards = () => {
  const { data, error, isLoading, refetch } = useGetDeckWithCardsQuery(3);
  const { cards } = data || {};

  const shuffledCards = useMemo(() => {
    if (!cards || cards?.length === 0) return [];
    return shuffleCards(addIdsToCards(doubleCards(cards)));
  }, [cards]);

  const numberOfGamesPlayed = useAppSelector(selectNumberOfGamesPlayed);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (numberOfGamesPlayed === 0) return;
    refetch();
  }, [numberOfGamesPlayed, refetch]);

  useEffect(() => {
    if (!cards || cards?.length === 0) return;
    preloadImages(cards);
  }, [cards]);

  useEffect(() => {
    dispatch(addCardsToState(shuffledCards));
  }, [dispatch, shuffledCards]);

  useEffect(() => {
    dispatch(loadTop10Scores());
  }, [dispatch]);

  return { cards: shuffledCards, error, isLoading };
};

export const useTimer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const seconds = useAppSelector(selectSeconds);

  return { seconds };
};
