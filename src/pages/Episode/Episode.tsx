import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spin, Result, Button, Empty } from 'antd';
import { episodesApi } from '@/api/episodes';
import type { Episode as EpisodeType } from '@/types';
import styles from './Episode.module.scss';

export const Episode = () => {
  const { id } = useParams<{ id: string }>();
  const episodeId = id!;

  const [episode, setEpisode] = useState<EpisodeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVoice, setActiveVoice] = useState<string | null>(null);

  useEffect(() => {
    if (!episodeId) return;

    let cancelled = false;
    setLoading(true);

    void (async () => {
      try {
        const ep = await episodesApi.getById(episodeId);
        if (cancelled) return;

        setEpisode(ep);
        setActiveVoice(ep.voiceovers[0]?.id ?? null);
      } catch (error) {
        if (!cancelled) {
          console.error('[Episode] failed to load episode', error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [episodeId]);

  if (loading) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }

  if (!episode) {
    return (
      <Result
        status="404"
        title="Серия не найдена"
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
      <Link to={`/cartoon/${episode.cartoonId}`} className={styles.back}>
        ← Назад к сериалу
      </Link>

      <section className={styles.voiceSection}>
        <span className={styles.voiceLabel}>Озвучка:</span>
        <div className={styles.voiceTabs}>
          {episode.voiceovers.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет озвучек"
            />
          ) : (
            episode.voiceovers.map((v) => (
              <button
                key={v.id}
                className={`${styles.voiceTab} ${
                  v.id === activeVoice ? styles.active : ''
                }`}
                onClick={() => setActiveVoice(v.id)}
              >
                {v.name}
              </button>
            ))
          )}
        </div>
      </section>

      <div className={styles.playerWrap}>
        <video
          key={activeVoice ?? 'default'}
          controls
          poster={episode.thumbnailUrl}
          className={styles.player}
        >
          <source src={episode.videoUrl} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{episode.title}</h1>
        {episode.description && (
          <p className={styles.description}>{episode.description}</p>
        )}
      </div>
    </div>
  );
};