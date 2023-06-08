import axios from 'axios';
import qs from 'qs';

type URLShortenerData = {
  url: string;
};

const api = axios.create({
  baseURL: process.env.ISGD_API_URL,
});

export function useIsgdURLShortenerAdapter() {
  async function shortenURL({ url }: URLShortenerData) {
    try {
      const query = qs.stringify({
        format: 'json',
        url,
      });

      const { data } = await api.get(`/create.php?${query}`);

      return data && data.shorturl ? data.shorturl : url;
    } catch {
      return url;
    }
  }

  return {
    shortenURL,
  };
}
