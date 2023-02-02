import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTopClickScores } from '../selectors';
import { loadTop10ClickScores } from '../thunks';
import { TopScoreList } from './TopScoreList';

export const TopClicks = () => {
  const topScores = useAppSelector(selectTopClickScores);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTop10ClickScores());
  }, [dispatch]);
  return <TopScoreList title="Top Click Scores: " topScores={topScores} itemLabel="clicks" />;
};
