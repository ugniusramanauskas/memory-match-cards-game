import { useTimer } from '../hooks';

type Props = {
  className?: string;
};

export const Timer = ({ className }: Props) => {
  const { seconds } = useTimer();
  return <div className={className}>{`Timer: ${seconds} seconds elapsed`}</div>;
};
