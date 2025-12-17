import { useEffect, useState } from "react";
import localData from "../data/profile.json";

const USE_LOCAL_DATA = true;
const API = "";

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        if (USE_LOCAL_DATA) {
          if (mounted) {
            setProfile(localData || null);
            setError(null);
            setIsLoading(false);
          }
          return;
        }

        const response = await fetch(API);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (mounted) {
          setProfile(data || null);
          setError(null);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        if (mounted) {
          setError("Failed to fetch profile data.");
        }
      } finally {
        if (mounted && !USE_LOCAL_DATA) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return { profile, isLoading, error };
}