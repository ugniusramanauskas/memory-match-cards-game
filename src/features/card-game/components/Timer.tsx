import { useTimer } from '../hooks';

export const Timer = () => {
  const { seconds } = useTimer();
  return (
    <div
      style={{
        height: '2.5rem',
      }}
    >
      <span>Seconds since the start: </span>
      <span
        style={{
          display: 'inline-block',
          width: '3em',
        }}
      >
        {seconds}
      </span>
    </div>
  );
};
