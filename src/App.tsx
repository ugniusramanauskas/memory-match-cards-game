import styles from './App.module.css';
import { Column } from './commons/Column';
import { CardGameBoard, ClickCounter, Timer, TopClicks, TopTimes } from './features/card-game';

export const App = () => {
  return (
    <div className={styles['app']}>
      <header className={styles['app-header']}>
        <Column>
          <h1 className="heading-medium">Memory Game</h1>
        </Column>
        <Column>
          <ClickCounter />
          <TopClicks />
        </Column>
        <Column>
          <Timer />
          <TopTimes />
        </Column>
      </header>
      <section className={styles['main-gameboard']}>
        <CardGameBoard />
      </section>
    </div>
  );
};
