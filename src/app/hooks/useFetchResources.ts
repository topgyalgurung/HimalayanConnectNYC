/**
 * useFetchResources Hook
 * 
 * A custom hook for fetching and managing resource data.
 * Handles API calls, error handling, and provides a refetch mechanism.
 * 
 * @returns {Object} Resource data and control functions
 * @returns {Resource[]} resources - Array of fetched resources
 * @returns {Function} refetch - Function to manually refresh resources
 */
import { useState, useEffect } from "react";
import type { Resource } from "@/app/lib/types";

// const RESOURCE_CACHE_KEY = "resourcecache"; // key for localStorage

export function useFetchResources() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
      fetchResources();
  }, []);

  async function fetchResources() {
    try {
      console.log("Fetching resources from API...");
      const response = await fetch("/api/resources", {
        // cache:'no-cache' 
        cache:'no-store' // fetch fresh data 
      });
        // or cache depending on time 
        // ,{ next: { revalidate: false | 0 | number }});
        // choose a certain number for how long to keep a page in memory
      // console.log("API Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // console.log("API Response data:", data);
      
      if (!Array.isArray(data)) {
        console.error("API returned non-array data:", data);
        setResources([]);
        return;
      }
      
      setResources(data);
      // localStorage.setItem(RESOURCE_CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching resources:", error);
      setResources([]);
    }
  }
  // refetch resources manually after
  return { resources, refetch: fetchResources };
}

