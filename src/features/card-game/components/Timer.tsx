import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { incrementSeconds } from '../cardGameSlice';

type Props = {
  className?: string;
};

export const Timer = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const seconds = useAppSelector((state) => state.cardGame.seconds);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);
  return <div className={className}>{`Timer: ${seconds} seconds elapsed`}</div>;
};
