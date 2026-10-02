import { Button, ConfigProvider, theme as antdTheme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';

export const Header = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: theme === 'dark' ? '#A63A00' : '#C8102E' },
      }}
    >
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo}>🍁</span>
          <span className={styles.title}>Maple Leaf</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/">
            <Button type={isActive('/') && location.pathname === '/' ? 'primary' : 'default'}>
              Главная
            </Button>
          </Link>
          <Link to="/news">
            <Button type={isActive('/news') ? 'primary' : 'default'}>
              Новости
            </Button>
          </Link>
          <ThemeToggle />
        </nav>
      </header>
    </ConfigProvider>
  );
};