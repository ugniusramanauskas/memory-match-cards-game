import { useAppSelector } from '../../../../app/hooks';
import { LiveCounter } from './LiveCounterTemplate';
import { selectNumberOfClicks } from '../../selectors';

export const ClickCounter = () => {
  const numberOfClicks = useAppSelector(selectNumberOfClicks);
  return <LiveCounter title="# of clicks: " value={numberOfClicks} />;
};
