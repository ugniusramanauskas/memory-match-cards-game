import { useAppSelector } from '../../../app/hooks';

type Props = {
  className?: string;
};

export const ClickCounter = ({ className }: Props) => {
  const numberOfClicks = useAppSelector((state) => state.cardGame.numberOfClicks);
  return <div className={className}># of clicks: {numberOfClicks}</div>;
};
