import styles from './App.module.css';
import { CardGameBoard, ClickCounter, Timer, TopScoreList } from './features/card-game';

export const App = () => {
  return (
    <div className="App">
      <header className={styles.appHeader}>
        <h1 className="heading-small">Memory Game</h1>
        <div>
          <ClickCounter />
          <TopScoreList />
        </div>
        <div>
          <Timer />
          <TopScoreList />
        </div>
      </header>
      <section className="main-gameboard">
        <CardGameBoard />
      </section>
    </div>
  );
};
