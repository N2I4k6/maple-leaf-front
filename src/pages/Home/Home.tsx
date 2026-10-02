import { useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';
import { cartoonsApi } from '@/api/cartoons';
import { CartoonCard } from '@/components/CartoonCard/CartoonCard';
import type { Cartoon } from '@/types';
import styles from './Home.module.scss';

export const Home = () => {
  const [cartoons, setCartoons] = useState<Cartoon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cartoonsApi
      .getAll()
      .then(setCartoons)
      .catch((error: unknown) => {
        console.error('[Home] failed to load cartoons', error);
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
      <h1 className={styles.pageTitle}>🍁 Все мультсериалы</h1>
      {cartoons.length === 0 ? (
        <Empty description="Пока ничего нет" />
      ) : (
        <div className={styles.grid}>
          {cartoons.map((c) => (
            <CartoonCard key={c.id} cartoon={c} />
          ))}
        </div>
      )}
    </div>
  );
};