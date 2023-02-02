import { useAppSelector } from '../../../app/hooks';
import { selectNumberOfClicks } from '../selectors';

export const ClickCounter = () => {
  const numberOfClicks = useAppSelector(selectNumberOfClicks);
  return (
    <div
      style={{
        textAlign: 'left',
        height: '2.5rem',
      }}
    >
      # of clicks: {numberOfClicks}
    </div>
  );
};
