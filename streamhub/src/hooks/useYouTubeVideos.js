import { useState, useEffect, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const CACHE_DURATION = 5 * 60 * 1000;

export const useYouTubeVideos = (searchQuery = 'programming tutorials') => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = useCallback(async (query) => {
    const cacheKey = `youtube_cache_${query}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setVideos(data);
        setLoading(false);
        return;
      }
    }

    if (!API_KEY) {
      setError('YouTube API key not configured. Please add VITE_YOUTUBE_API_KEY to your .env file.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=24&key=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('YouTube API quota exceeded or invalid API key');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const formattedVideos = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      }));

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ data: formattedVideos, timestamp: Date.now() })
      );

      setVideos(formattedVideos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos(searchQuery);
  }, [fetchVideos, searchQuery]);

  const refetch = useCallback(() => {
    fetchVideos(searchQuery);
  }, [fetchVideos, searchQuery]);

  return { videos, loading, error, refetch };
};
