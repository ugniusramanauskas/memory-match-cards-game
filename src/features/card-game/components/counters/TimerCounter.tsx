import { CounterTemplate } from './CounterTemplate';
import { useTimer } from '../../hooks';

export const TimerCounter = () => {
  const { seconds } = useTimer();
  return <CounterTemplate title="Seconds since the start: " value={seconds} />;
};
