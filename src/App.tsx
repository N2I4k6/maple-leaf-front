import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { ThemeProvider } from '@/context/ThemeProvider';
import { useTheme } from '@/hooks/useTheme';
import { Layout } from '@/components/Layout/Layout';
import { Home } from '@/pages/Home/Home';
import { Cartoon } from '@/pages/Cartoon/Cartoon';
import { Episode } from '@/pages/Episode/Episode';
import { News } from '@/pages/News/News';
import { NotFound } from '@/pages/NotFound/NotFound';

const AntdThemeBridge = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: theme === 'dark' ? '#A63A00' : '#C8102E',
          borderRadius: 10,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export const App = () => (
  <ThemeProvider>
    <AntdThemeBridge>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cartoon/:id" element={<Cartoon />} />
            <Route path="/episode/:id" element={<Episode />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AntdThemeBridge>
  </ThemeProvider>
);