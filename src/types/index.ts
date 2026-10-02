export interface Cartoon {
    id: string;
    title: string;
    description: string;
    rating: number;
    posterUrl: string;
    year: number;
    genres: string[];
  }
  
  export interface Season {
    id: string;
    cartoonId: string;
    number: number;
    title: string;
  }
  
  export interface Episode {
    id: string;
    seasonId: string;
    cartoonId: string;
    number: number;
    title: string;
    thumbnailUrl: string;
    duration: number;
    description?: string;
    videoUrl: string;
    voiceovers: Voiceover[];
  }
  
  export interface Voiceover {
    id: string;
    name: string;
    language: string;
  }
  
  export interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    coverUrl: string;
    date: string;
  }
  
  export type ThemeMode = 'light' | 'dark';