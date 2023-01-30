import './App.css';
import { CardGameBoard } from './features/card-game/CardGameBoard';
import { ClickCounter } from './features/card-game/components/ClickCounter';
import { Timer } from './features/card-game/components/Timer';
import { TopScoreList } from './features/card-game/components/TopScoreList';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="heading-small">Memory Game</h1>
        <ClickCounter className="heading-small" />
        <Timer className="heading-small" />
        <TopScoreList className="heading-small" />
      </header>
      <section className="main-gameboard">
        <CardGameBoard />
      </section>
    </div>
  );
};
