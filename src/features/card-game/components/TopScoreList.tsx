import { useAppSelector } from '../../../app/hooks';

type Props = {
  className?: string;
};

export const TopScoreList = ({ className }: Props) => {
  const topScores = useAppSelector((state) => state.cardGame.top10Scores);
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      TopScoreList:
      {topScores.map((score, index) => (
        <div key={score}>
          <span
            style={{
              display: 'inline-block',
              width: '1.5rem',
            }}
          >
            {index + 1}.
          </span>
          <span>{score} clicks</span>
        </div>
      ))}
    </div>
  );
};
