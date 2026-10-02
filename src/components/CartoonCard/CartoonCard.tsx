import { Link } from 'react-router-dom';
import type { Cartoon } from '@/types';
import { Rating } from '../Rating/Rating';
import styles from './CartoonCard.module.scss';

interface Props {
  cartoon: Cartoon;
}

export const CartoonCard = ({ cartoon }: Props) => (
  <Link to={`/cartoon/${cartoon.id}`} className={styles.card}>
    <div className={styles.posterWrap}>
      <img src={cartoon.posterUrl} alt={cartoon.title} loading="lazy" />
      <div className={styles.overlay} />
    </div>
    <div className={styles.info}>
      <h3 className={styles.title}>{cartoon.title}</h3>
      <Rating value={cartoon.rating} />
    </div>
  </Link>
);