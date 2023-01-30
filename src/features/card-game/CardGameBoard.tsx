import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetNewDeckIdQuery, useGetDeckWithCardsQuery } from '../../services/cards';
import { Card } from './components/Card';
import styles from './CardGame.module.css';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCardsToState, clearSeconds, loadTop10Scores } from './cardGameSlice';

export const CardGameBoard = () => {
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
  const dispatch = useAppDispatch();
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

  const numberOfGamesPlayed: number = useAppSelector((state) => state.cardGame.numberOfGamesPlayed);

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

  if (error) return <h3>Something went wrong</h3>;
  if (isLoading) return <h3>Loading...</h3>;
  if (shuffledCards.length === 0) return <h3>No cards were loaded</h3>;

  // console.log('Re-rendering board');
  return (
    <div className={styles.cardBoard}>
      {shuffledCards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};
