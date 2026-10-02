import { useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';
import { newsApi } from '@/api/news';
import type { NewsItem } from '@/types';
import styles from './News.module.scss';

export const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsApi
      .getAll()
      .then(setNews)
      .catch((error: unknown) => {
        console.error('[News] failed to load news', error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>🍁 Новости</h1>
      {news.length === 0 ? (
        <Empty description="Пока новостей нет" />
      ) : (
        <div className={styles.list}>
          {news.map((n) => (
            <article key={n.id} className={styles.card}>
              <div className={styles.coverWrap}>
                <img src={n.coverUrl} alt={n.title} loading="lazy" />
              </div>
              <div className={styles.body}>
                <time className={styles.date}>
                  {new Date(n.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <h2 className={styles.title}>{n.title}</h2>
                <p className={styles.excerpt}>{n.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};