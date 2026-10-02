import { Button } from 'antd';
import { useTheme } from '@/hooks/useTheme';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Переключить тему"
      title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};