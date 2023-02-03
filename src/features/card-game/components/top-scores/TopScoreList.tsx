import styles from '../CardGame.module.css';

type Props = {
  title: string;
  topScores: number[];
  itemLabel: string;
};

export const TopScoreList = ({ title, topScores, itemLabel }: Props) => {
  if (!topScores || topScores.length === 0) return null;
  return (
    <>
      <h2
        className={styles['top-score-header-xs']}
        style={{
          fontSize: '1em',
          display: 'flex',
          alignItems: 'flex-start',
          textAlign: 'left',
          fontWeight: 'bold',
          lineHeight: 1.5,
        }}
      >
        {title}
      </h2>
      <ol
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: 20,
          margin: 0,
        }}
      >
        {topScores.map((score) => (
          <li key={score}>
            {score} {itemLabel}
          </li>
        ))}
      </ol>
    </>
  );
};
