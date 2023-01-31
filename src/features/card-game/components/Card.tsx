import { ICard } from '../types';
import { GENERIC_CARD_BACK_SIDE_IMAGE } from '../constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clickCard } from '../thunks';
import { selectIsFlipped } from '../selectors';

type Props = {
  card: ICard;
};

export const Card = ({ card }: Props) => {
  const dispatch = useAppDispatch();
  const { images, id } = card || {};
  const { png: cardImage } = images || {};
  const isFlipped = useAppSelector((state) => selectIsFlipped(state, id));
  const handleClick = () => dispatch(clickCard(id));

  if (!cardImage) return null;
  return (
    <img
      style={{ maxWidth: '80px', minWidth: '40px' }}
      src={!isFlipped ? GENERIC_CARD_BACK_SIDE_IMAGE : cardImage}
      alt={String(id)}
      onClick={handleClick}
    />
  );
};
