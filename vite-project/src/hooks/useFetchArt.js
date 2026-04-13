import { useCallback, useEffect, useState } from 'react';
import metApi from '../api/metApi';

const MAX_RESULTS = 24;
const DEFAULT_QUERY = 'art';

const sanitizeArtItem = (item) => {
  const imageUrl = item?.primaryImage || item?.primaryImageSmall;
  if (!imageUrl) {
    return null;
  }

  return {
    id: item.objectID,
    title: item.title || 'Untitled',
    artist: item.artistDisplayName || 'Unknown Artist',
    imageUrl,
    date: item.objectDate || 'Date Unknown',
    department: item.department || 'General',
  };
};

export default function useFetchArt() {
  const [artData, setArtData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(DEFAULT_QUERY);

  const fetchFromIds = useCallback(async (objectIds = []) => {
    const limitedIds = objectIds.slice(0, MAX_RESULTS);
    const detailRequests = limitedIds.map((id) => metApi.get(`objects/${id}`));
    const detailResponses = await Promise.allSettled(detailRequests);

    return detailResponses
      .filter((response) => response.status === 'fulfilled')
      .map((response) => sanitizeArtItem(response.value.data))
      .filter(Boolean);
  }, []);

  const searchArt = useCallback(
    async (query) => {
      const trimmedQuery = query?.trim();
      if (!trimmedQuery) {
        setArtData([]);
        setError('');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const searchResponse = await metApi.get('search', {
          params: {
            q: trimmedQuery,
            hasImages: true,
          },
        });

        const objectIds = searchResponse.data?.objectIDs || [];
        if (!objectIds.length) {
          setArtData([]);
          return;
        }

        const sanitizedArt = await fetchFromIds(objectIds);
        setArtData(sanitizedArt);
      } catch {
        setError('Unable to fetch artworks right now. Please try again.');
        setArtData([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFromIds]
  );

  const fetchByDepartment = useCallback(
    async (departmentId) => {
      if (!departmentId && departmentId !== 0) {
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const searchResponse = await metApi.get('search', {
          params: {
            q: searchQuery.trim() || DEFAULT_QUERY,
            departmentId,
            hasImages: true,
          },
        });

        const objectIds = searchResponse.data?.objectIDs || [];
        if (!objectIds.length) {
          setArtData([]);
          return;
        }

        const sanitizedArt = await fetchFromIds(objectIds);
        setArtData(sanitizedArt);
      } catch {
        setError('Unable to fetch department artworks right now.');
        setArtData([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFromIds, searchQuery]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      searchArt(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchArt, searchQuery]);

  return {
    artData,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    searchArt,
    fetchByDepartment,
  };
}
