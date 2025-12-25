import { useEffect, useState, useCallback } from "react";
import localData from "../data/profile.json";

const STORAGE_KEY = 'travelapp_profile_data';

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Try to get from local storage first
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProfile(JSON.parse(stored));
        } else {
          // Fallback to local JSON and save it
          setProfile(localData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(localData));
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load profile", err);
        setError("Failed to load profile data");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Function to update profile
  const updateProfile = useCallback((newProfileData) => {
    return new Promise((resolve, reject) => {
      try {
        // Merge with existing state to ensure we don't lose other data
        setProfile(prev => {
          const updated = {
            ...prev,
            profile: {
              ...prev.profile,
              ...newProfileData
            }
          };

          // Persist to local storage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  return { profile, isLoading, error, updateProfile };
}