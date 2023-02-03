import { useAppSelector } from '../../../../app/hooks';
import { CounterTemplate } from './CounterTemplate';
import { selectNumberOfClicks } from '../../selectors';

export const ClickCounter = () => {
  const numberOfClicks = useAppSelector(selectNumberOfClicks);
  return <CounterTemplate title="# of clicks: " value={numberOfClicks} />;
};
