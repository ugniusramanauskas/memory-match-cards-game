import { useTimer } from '../hooks';

type Props = {
  className?: string;
};

export const Timer = ({ className }: Props) => {
  const { seconds } = useTimer();
  return (
    <div
      className="heading-small"
      style={{
        height: '2rem',
      }}
    >
      <span>Seconds elapsed in game: </span>
      <span
        style={{
          display: 'inline-block',
          width: '5rem',
        }}
      >
        {seconds}
      </span>
    </div>
  );
};
