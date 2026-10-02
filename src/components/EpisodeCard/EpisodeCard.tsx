import { Link } from 'react-router-dom';
import type { Episode } from '@/types';
import styles from './EpisodeCard.module.scss';

interface Props {
  episode: Episode;
}

export const EpisodeCard = ({ episode }: Props) => (
  <Link to={`/episode/${episode.id}`} className={styles.card}>
    <div className={styles.thumbWrap}>
      <img src={episode.thumbnailUrl} alt={episode.title} loading="lazy" />
      <span className={styles.number}>#{episode.number}</span>
    </div>
    <div className={styles.info}>
      <h4 className={styles.title}>{episode.title}</h4>
    </div>
  </Link>
);