import { Card } from './Card';
import styles from './CardGame.module.css';
import { useGetCards } from '../hooks';

export const CardGameBoard = () => {
  const { cards, error, isLoading } = useGetCards();

  if (error) return <h3>Something went wrong</h3>;
  if (isLoading) return <h3>Loading...</h3>;
  if (cards.length === 0) return <h3>No cards were loaded</h3>;

  return (
    <div className={styles.cardBoard}>
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};
