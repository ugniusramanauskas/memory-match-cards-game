import { ICard } from '../../../services/types';
import { GENERIC_BACK_CARDS_URL } from '../../../services/constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clickCard } from '../thunks';
import { selectIsFlipped } from '../selectors';

type Props = {
  card: ICard;
};

export const Card = ({ card }: Props) => {
  const dispatch = useAppDispatch();
  const { images, id } = card;
  const isFlipped = useAppSelector((state) => selectIsFlipped(state, id));
  const handleClick = () => dispatch(clickCard(id));

  return (
    <img
      style={{ maxWidth: '80px', minWidth: '40px' }}
      src={!isFlipped ? GENERIC_BACK_CARDS_URL : images.png}
      alt={String(id)}
      onClick={handleClick}
    />
  );
};
