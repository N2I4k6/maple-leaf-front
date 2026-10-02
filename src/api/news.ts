import { apiClient } from './client';
import type { NewsItem } from '@/types';

interface RawNews {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  publishedAt: string;
  createdAt: string;
}

interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const normalizeNews = (raw: RawNews): NewsItem => ({
  id: raw._id,
  title: raw.title,
  excerpt: raw.excerpt,
  coverUrl: raw.coverUrl,
  date: raw.publishedAt ?? raw.createdAt,
});

export const newsApi = {
  async getAll(): Promise<NewsItem[]> {
    const { data } = await apiClient.get<Paginated<RawNews>>('/news');
    return data.items.map(normalizeNews);
  },
};