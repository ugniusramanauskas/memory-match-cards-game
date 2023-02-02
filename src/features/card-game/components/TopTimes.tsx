import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTopTimes } from '../selectors';
import { loadTop10Times } from '../thunks';
import { TopScoreList } from './TopScoreList';

export const TopTimes = () => {
  const topScores = useAppSelector(selectTopTimes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTop10Times());
  }, [dispatch]);
  return <TopScoreList title="Top Times: " topScores={topScores} itemLabel="secs" />;
};
