import { useAppSelector } from '../../../app/hooks';
import { selectNumberOfClicks } from '../selectors';

export const ClickCounter = () => {
  const numberOfClicks = useAppSelector(selectNumberOfClicks);
  return (
    <div
      className="heading-small"
      style={{
        textAlign: 'left',
        height: '2rem',
      }}
    >
      # of clicks: {numberOfClicks}
    </div>
  );
};
