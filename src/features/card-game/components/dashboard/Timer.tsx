import { LiveCounter } from './LiveCounterTemplate';
import { useTimer } from '../../hooks';

export const Timer = () => {
  const { seconds } = useTimer();
  return <LiveCounter title="Seconds since the start: " value={seconds} />;
};
