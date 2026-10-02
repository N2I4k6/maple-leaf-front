import { apiClient } from './client';
import type { Episode, Voiceover } from '@/types';

interface RawVoiceover {
  _id: string;
  name: string;
  language: string;
  studio?: string;
}

interface RawEpisode {
  _id: string;
  seasonId: string;
  cartoonId: string;
  number: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  description?: string;
  voiceoverIds: RawVoiceover[];
}

const normalizeVoiceover = (raw: RawVoiceover): Voiceover => ({
  id: raw._id,
  name: raw.name,
  language: raw.language,
});

const normalizeEpisode = (raw: RawEpisode): Episode => ({
  id: raw._id,
  seasonId: raw.seasonId,
  cartoonId: raw.cartoonId,
  number: raw.number,
  title: raw.title,
  thumbnailUrl: raw.thumbnailUrl,
  videoUrl: raw.videoUrl,
  duration: raw.duration,
  description: raw.description,
  voiceovers: (raw.voiceoverIds ?? []).map(normalizeVoiceover),
});

export const episodesApi = {
  async getBySeason(seasonId: string): Promise<Episode[]> {
    const { data } = await apiClient.get<RawEpisode[]>(`/episodes/by-season/${seasonId}`);
    return data.map(normalizeEpisode);
  },

  async getById(id: string): Promise<Episode> {
    const { data } = await apiClient.get<RawEpisode>(`/episodes/${id}`);
    return normalizeEpisode(data);
  },
};