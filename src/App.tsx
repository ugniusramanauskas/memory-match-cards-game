import './App.css';
import { CardGameBoard } from './features/card-game/CardGameBoard';
import { ClickCounter } from './features/card-game/components/ClickCounter';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="heading-small">Memory Game</h1>
        {/* <Timer /> */}
        <ClickCounter className="heading-small" />
        {/* <TopScoreList /> */}
      </header>
      <section className="main-gameboard">
        <CardGameBoard />
      </section>
    </div>
  );
};
