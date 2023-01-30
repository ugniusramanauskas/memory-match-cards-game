import { useAppSelector } from '../../../app/hooks';
import { selectNumberOfClicks } from '../selectors';

type Props = {
  className?: string;
};

export const ClickCounter = ({ className }: Props) => {
  const numberOfClicks = useAppSelector(selectNumberOfClicks);
  return <div className={className}># of clicks: {numberOfClicks}</div>;
};
