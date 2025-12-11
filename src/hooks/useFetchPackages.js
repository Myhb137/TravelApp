import { useState, useEffect } from 'react';
import localData from '../data/offers.json';

const API_URL = 'https://your-api-domain.com/api/v1/packages';
const USE_LOCAL_DATA = true;

/**
 * Custom hook for fetching travel packages with a local JSON fallback.
 * @returns {{packages: Array, isLoading: boolean, error: string|null}}
 */
export default function useFetchPackages() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (USE_LOCAL_DATA) {
        // Simulate network delay for better UX during development.
        setTimeout(() => {
          if (!mounted) return;
          setPackages(localData.travelPackages || []);
          setIsLoading(false);
          setError(null);
        }, 500);
        return;
      }

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (mounted) {
          setPackages(data.travelPackages || []);
          setError(null);
        }
      } catch (err) {
        console.error('Fetch failed:', err);
        if (mounted) setError('Failed to fetch data. Check network/API URL.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { packages, isLoading, error };
}