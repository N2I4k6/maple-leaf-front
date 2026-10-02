import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spin, Result, Button, Empty } from 'antd';
import { cartoonsApi } from '@/api/cartoons';
import { episodesApi } from '@/api/episodes';
import { Rating } from '@/components/Rating/Rating';
import { SeasonTabs } from '@/components/SeasonTabs/SeasonTabs';
import { EpisodeCard } from '@/components/EpisodeCard/EpisodeCard';
import type { Cartoon as CartoonType, Season, Episode } from '@/types';
import styles from './Cartoon.module.scss';

export const Cartoon = () => {
  const { id } = useParams<{ id: string }>();
  const cartoonId = id!;

  const [cartoon, setCartoon] = useState<CartoonType | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [activeSeasonId, setActiveSeasonId] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [epsLoading, setEpsLoading] = useState(false);

  useEffect(() => {
    if (!cartoonId) return;

    let cancelled = false;
    setLoading(true);

    void (async () => {
      try {
        const [c, s] = await Promise.all([
          cartoonsApi.getById(cartoonId),
          cartoonsApi.getSeasons(cartoonId),
        ]);

        if (cancelled) return;

        setCartoon(c ?? null);
        setSeasons(s);
        setActiveSeasonId(s[0]?.id ?? null);
      } catch (error) {
        if (!cancelled) {
          console.error('[Cartoon] failed to load cartoon', error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cartoonId]);

  useEffect(() => {
    if (!activeSeasonId) return;

    let cancelled = false;
    setEpsLoading(true);

    void (async () => {
      try {
        const eps = await episodesApi.getBySeason(activeSeasonId);
        if (!cancelled) setEpisodes(eps);
      } catch (error) {
        if (!cancelled) {
          console.error('[Cartoon] failed to load episodes', error);
        }
      } finally {
        if (!cancelled) setEpsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeSeasonId]);

  if (loading) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }

  if (!cartoon) {
    return (
      <Result
        status="404"
        title="Сериал не найден"
        extra={
          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.posterWrap}>
          <img src={cartoon.posterUrl} alt={cartoon.title} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{cartoon.title}</h1>
          <div className={styles.meta}>
            <Rating value={cartoon.rating} />
            <span className={styles.year}>{cartoon.year}</span>
          </div>
          <p className={styles.description}>{cartoon.description}</p>
          <div className={styles.genres}>
            {cartoon.genres.map((g) => (
              <span key={g} className={styles.genre}>
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.seasonSection}>
        <h2 className={styles.sectionTitle}>Сезоны</h2>
        <SeasonTabs
          seasons={seasons}
          activeId={activeSeasonId}
          onChange={setActiveSeasonId}
        />
      </section>

      <section className={styles.episodesSection}>
        <h2 className={styles.sectionTitle}>Серии</h2>
        {epsLoading ? (
          <div className={styles.center}>
            <Spin />
          </div>
        ) : episodes.length === 0 ? (
          <Empty description="Серий нет" />
        ) : (
          <div className={styles.episodesGrid}>
            {episodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};