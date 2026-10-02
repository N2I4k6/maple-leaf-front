import { apiClient } from './client';
import type { Cartoon, Season } from '@/types';

interface RawCartoon {
  _id: string;
  title: string;
  description: string;
  rating: number;
  posterUrl: string;
  year: number;
  genres: string[];
}

interface RawSeason {
  _id: string;
  cartoonId: string;
  number: number;
  title: string;
}

interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const normalizeCartoon = (raw: RawCartoon): Cartoon => ({
  id: raw._id,
  title: raw.title,
  description: raw.description,
  rating: raw.rating,
  posterUrl: raw.posterUrl,
  year: raw.year,
  genres: raw.genres ?? [],
});

const normalizeSeason = (raw: RawSeason): Season => ({
  id: raw._id,
  cartoonId: raw.cartoonId,
  number: raw.number,
  title: raw.title,
});

export const cartoonsApi = {
  async getAll(): Promise<Cartoon[]> {
    const { data } = await apiClient.get<Paginated<RawCartoon>>('/cartoons');
    return data.items.map(normalizeCartoon);
  },

  async getById(id: string): Promise<Cartoon | undefined> {
    const { data } = await apiClient.get<RawCartoon>(`/cartoons/${id}`);
    return normalizeCartoon(data);
  },

  async getSeasons(cartoonId: string): Promise<Season[]> {
    const { data } = await apiClient.get<RawSeason[]>(`/seasons/by-cartoon/${cartoonId}`);
    return data.map(normalizeSeason);
  },
};