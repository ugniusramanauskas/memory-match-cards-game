import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetDeckWithCardsQuery } from './cardsApi';
import { selectNumberOfGamesPlayed, selectSeconds } from './selectors';
import { addCardsToState, incrementSeconds } from './slice';
import { ICard } from './types';
import { addIdsToCards, doubleCards, preloadImages, shuffleCards } from './utils';

const useRefetchCardsAfterEachGame = (refetch: () => void) => {
  const numberOfGamesPlayed = useAppSelector(selectNumberOfGamesPlayed);
  useEffect(() => {
    if (numberOfGamesPlayed === 0) return;
    refetch();
  }, [numberOfGamesPlayed, refetch]);
};

const usePreloadImagesToCache = (cards: ICard[] | undefined) => {
  useEffect(() => {
    if (!cards || cards?.length === 0) return;
    preloadImages(cards);
  }, [cards]);
};

export const useLoadCards = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading, refetch } = useGetDeckWithCardsQuery();
  const { cards } = data || {};

  const shuffledCards = useMemo(() => {
    if (!cards || cards?.length === 0) return [];
    return shuffleCards(addIdsToCards(doubleCards(cards)));
  }, [cards]);

  useRefetchCardsAfterEachGame(refetch);
  usePreloadImagesToCache(cards);

  useEffect(() => {
    dispatch(addCardsToState(shuffledCards));
  }, [dispatch, shuffledCards]);

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
