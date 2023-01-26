import { skipToken } from '@reduxjs/toolkit/query/react';
import { Counter } from './features/counter/Counter';
import { useGetNewDeckIdQuery, useGetDeckWithCardsQuery } from './services/cards';
import './App.css';

export const App = () => {
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

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <h3>{data.cards[0].images.svg}</h3>
          ) : null}
        </div>
        <Counter />
      </header>
    </div>
  );
};
