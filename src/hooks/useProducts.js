import { useState, useEffect, useCallback } from 'react';

const CACHE_DURATION = 10 * 60 * 1000;

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    const cached = sessionStorage.getItem('products_cache');

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setProducts(data);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      sessionStorage.setItem(
        'products_cache',
        JSON.stringify({ data, timestamp: Date.now() })
      );

      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch };
};
