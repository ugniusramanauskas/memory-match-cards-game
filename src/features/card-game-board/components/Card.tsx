import { FC } from 'react';
import { ICard } from '../../../services/types';

type Props = {
  card: ICard;
};

export const Card: FC<Props> = ({ card }) => {
  const { images, code } = card;
  return <img width="80" src={images.png} alt={code} />;
};
