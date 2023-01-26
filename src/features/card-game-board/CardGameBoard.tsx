import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetNewDeckIdQuery, useGetDeckWithCardsQuery } from '../../services/cards';
import { Card } from './components/Card';
import styles from './CardGameBoard.module.css';

type Props = {};

export const CardGameBoard = (props: Props) => {
  const useCombinedQuery = () => {
    const { data: deckIdData } = useGetNewDeckIdQuery();
    const { deck_id } = deckIdData || {};
    const {
      data: deckWithCardsData,
      error,
      isLoading,
    } = useGetDeckWithCardsQuery(deck_id ?? skipToken);
    return { deckWithCardsData, error, isLoading };
  };
  const { deckWithCardsData: data, error, isLoading } = useCombinedQuery();
  if (error) return <h3>Something went wrong</h3>;
  if (isLoading) return <h3>Loading...</h3>;
  const { cards } = data || {};
  if (!data || !cards || cards?.length === 0) return <h3>No cards were loaded</h3>;

  const doubleCards = [...cards, ...cards];
  const shuffledCards = doubleCards.sort(() => 0.5 - Math.random());

  return (
    <div className={styles.cardBoard}>
      {shuffledCards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};
