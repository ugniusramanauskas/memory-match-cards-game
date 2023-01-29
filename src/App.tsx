import './App.css';
import { CardGameBoard } from './features/card-game/CardGameBoard';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        {/* <Timer />
        <ClickCounter />
        <TopScoreList /> */}
      </header>
      <section className="main-gameboard">
        <CardGameBoard />
      </section>
    </div>
  );
};
