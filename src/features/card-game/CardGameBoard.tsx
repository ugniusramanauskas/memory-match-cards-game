import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetNewDeckIdQuery, useGetDeckWithCardsQuery } from '../../services/cards';
import { Card } from './components/Card';
import styles from './CardGameBoard.module.css';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCardIdToMatched, addCardsToState, clearCardIdsUnderEvaluation } from './cardGameSlice';

export const CardGameBoard = () => {
  const useCombinedGetCardsQuery = () => {
    const { data: deckIdData } = useGetNewDeckIdQuery();
    const { deck_id } = deckIdData || {};
    const {
      data: deckWithCardsData,
      error,
      isLoading,
    } = useGetDeckWithCardsQuery(deck_id ?? skipToken);
    return { deckWithCardsData, error, isLoading };
  };
  const dispatch = useAppDispatch();
  const { deckWithCardsData: data, error, isLoading } = useCombinedGetCardsQuery();
  const { cards } = data || {};
  const shuffledCards = useMemo(() => {
    if (!cards || cards?.length === 0) return [];
    const doubleCards = [...cards, ...cards];
    const doubleCardsWithIds = doubleCards.map((card, index) => ({
      ...card,
      id: index,
      // isFlipped: false,
    }));
    return doubleCardsWithIds.sort(() => 0.5 - Math.random());
  }, [cards]);

  const cardIdsUnderEvaluation = useAppSelector((state) => state.cardGame.cardIdsUnderEvaluation);
  const cardsInState = useAppSelector((state) => state.cardGame.cards);

  useEffect(() => {
    dispatch(addCardsToState(shuffledCards));
  }, [dispatch, shuffledCards]);

  useEffect(() => {
    if (cardIdsUnderEvaluation.length === 2) {
      console.log('cardIdsUnderEvaluation: ', cardIdsUnderEvaluation);
      const [cardId1, cardId2] = cardIdsUnderEvaluation;
      const card1 = cardsInState.find((card) => card.id === cardId1);
      const card2 = cardsInState.find((card) => card.id === cardId2);
      if (card1 && card2 && card1.code === card2.code) {
        dispatch(addCardIdToMatched(cardId1));
        dispatch(addCardIdToMatched(cardId2));
      }
      setTimeout(() => {
        dispatch(clearCardIdsUnderEvaluation());
      }, 1200);
    }
  }, [cardIdsUnderEvaluation, dispatch]);

  if (error) return <h3>Something went wrong</h3>;
  if (isLoading) return <h3>Loading...</h3>;
  if (shuffledCards.length === 0) return <h3>No cards were loaded</h3>;

  console.log('Re-rendering board');
  return (
    <div className={styles.cardBoard}>
      {shuffledCards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};
