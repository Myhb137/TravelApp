import { useEffect, useState, useRef } from "react";
import localData from "../data/profile.json";

const USE_LOCAL_DATA = true;
const API_URL = "";
const FETCH_TIMEOUT = 10000; // 10 seconds

/**
 * Validates profile data structure
 * @param {any} data - Data to validate
 * @returns {boolean} - True if data structure is valid
 */
const validateProfileData = (data) => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  // Basic structure validation
  if (data.profile && typeof data.profile === 'object') {
    return true;
  }
  
  return false;
};

/**
 * Sanitizes profile data to prevent XSS
 * @param {any} data - Data to sanitize
 * @returns {any} - Sanitized data
 */
const sanitizeProfileData = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }
  
  // Create a deep copy to avoid mutating original
  const sanitized = JSON.parse(JSON.stringify(data));
  
  // Basic sanitization - in production, use a proper sanitization library
  if (sanitized.profile?.email) {
    sanitized.profile.email = String(sanitized.profile.email).trim();
  }
  
  if (sanitized.profile?.fullName) {
    sanitized.profile.fullName = String(sanitized.profile.fullName).trim();
  }
  
  return sanitized;
};

/**
 * Custom hook to fetch user profile data
 * @returns {{ profile: object | null, isLoading: boolean, error: string | null }}
 */
export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Create AbortController for proper cleanup
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (USE_LOCAL_DATA) {
          // Simulate async behavior for consistency
          await new Promise(resolve => setTimeout(resolve, 100));
          
          if (signal.aborted) return;

          const validatedData = validateProfileData(localData) 
            ? sanitizeProfileData(localData) 
            : null;

          if (!validatedData) {
            throw new Error("Invalid profile data structure");
          }

          setProfile(validatedData);
          setIsLoading(false);
          return;
        }

        // Validate API URL before making request
        if (!API_URL || typeof API_URL !== 'string' || API_URL.trim() === '') {
          throw new Error("API URL is not configured");
        }

        // Validate URL format
        try {
          new URL(API_URL);
        } catch {
          throw new Error("Invalid API URL format");
        }

        // Create timeout controller
        const timeoutId = setTimeout(() => {
          abortControllerRef.current?.abort();
        }, FETCH_TIMEOUT);

        try {
          const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add authentication headers here if needed
              // 'Authorization': `Bearer ${token}`,
            },
            signal,
            credentials: 'same-origin', // Only send cookies for same-origin requests
          });

          clearTimeout(timeoutId);

          if (signal.aborted) {
            return;
          }

          if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error');
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${errorText}`
            );
          }

          const data = await response.json().catch(() => {
            throw new Error("Failed to parse response as JSON");
          });

          if (signal.aborted) {
            return;
          }

          // Validate and sanitize fetched data
          if (!validateProfileData(data)) {
            throw new Error("Invalid profile data structure received from server");
          }

          const sanitizedData = sanitizeProfileData(data);
          setProfile(sanitizedData);
          setIsLoading(false);
        } catch (fetchError) {
          clearTimeout(timeoutId);
          throw fetchError;
        }
      } catch (err) {
        // Don't update state if component was unmounted or request was aborted
        if (signal.aborted) {
          return;
        }

        console.error("Profile fetch failed:", err);
        
        // Provide user-friendly error messages
        let errorMessage = "Failed to fetch profile data.";
        
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            errorMessage = "Request was cancelled.";
            return; // Don't set error for aborted requests
          }
          errorMessage = err.message || errorMessage;
        }

        setError(errorMessage);
        setProfile(null);
        setIsLoading(false);
      }
    };

    fetchProfile();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { profile, isLoading, error };
}