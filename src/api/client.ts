import axios, { type AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api',
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      const status = error.response?.status;
      const url = error.config?.url;
      const data = error.response?.data;

      console.error('[api]', status, url, data);
    }
    return Promise.reject(error);
  },
);