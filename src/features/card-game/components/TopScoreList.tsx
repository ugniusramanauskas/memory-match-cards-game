import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTopScores } from '../selectors';
import { loadTop10Scores } from '../thunks';

type Props = {
  className?: string;
};

export const TopScoreList = ({ className }: Props) => {
  const topScores = useAppSelector(selectTopScores);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTop10Scores());
  }, [dispatch]);

  return (
    <div
      className="heading-small"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div
        className="top-score-header-xs"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          fontWeight: 'bold',
        }}
      >
        Top Scores (by clicks):
      </div>
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
