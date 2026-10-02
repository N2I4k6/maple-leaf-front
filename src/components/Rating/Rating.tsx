import styles from './Rating.module.scss';

interface Props {
  value: number;
}

export const Rating = ({ value }: Props) => {
  const color = value >= 8 ? 'high' : value >= 6 ? 'mid' : 'low';
  return (
    <span className={`${styles.rating} ${styles[color]}`}>
      ⭐ {value.toFixed(1)}
    </span>
  );
};