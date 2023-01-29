import { FC } from 'react';
import { ICard } from '../../../services/types';
import { GENERIC_BACK_CARDS_URL } from '../../../services/constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clickCard, selectIsFlipped } from '../cardGameSlice';

type Props = {
  card: ICard;
};

export const Card: FC<Props> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { images, id } = card;
  const isFlipped = useAppSelector((state) => selectIsFlipped(state, id));
  const handleClick = () => dispatch(clickCard(id));

  console.log('Re-rendering card: ', id);
  return (
    <img
      style={{ maxWidth: '80px', minWidth: '40px' }}
      src={!isFlipped ? GENERIC_BACK_CARDS_URL : images.png}
      alt={String(id)}
      onClick={handleClick}
    />
  );
};
