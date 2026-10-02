import type { Season } from '@/types';
import styles from './SeasonTabs.module.scss';

interface Props {
  seasons: Season[];
  activeId: string | null;
  onChange: (id: string) => void;
}

export const SeasonTabs = ({ seasons, activeId, onChange }: Props) => (
  <div className={styles.tabs}>
    {seasons.map((s) => (
      <button
        key={s.id}
        className={`${styles.tab} ${s.id === activeId ? styles.active : ''}`}
        onClick={() => onChange(s.id)}
      >
        {s.title}
      </button>
    ))}
  </div>
);