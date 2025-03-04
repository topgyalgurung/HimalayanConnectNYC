// src/app/(homepage)/hooks/useFetchResources.ts
import { useState, useEffect } from "react";
import type { Resource } from "@/app/types/resource"; // Update this import

const RESOURCE_CACHE_KEY = "resourcecache"; // key for localStorage

// need to implement to get fresh data after certain minutes
export function useFetchResources() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    // Attempt to retrieve cached resources from localStorage
    const cacheResources = localStorage.getItem(RESOURCE_CACHE_KEY);
    
    // If cached resources are found, parse and set them
    if (cacheResources) {
      const parsedResources = JSON.parse(cacheResources);
      console.log("Setting cached resources:", parsedResources);
      setResources(parsedResources);
    } else {
      // If no cache is found, log a message and fetch fresh data
      console.log("No cache found, fetching fresh data");
      fetchResources(); 
    }
  }, []);

  async function fetchResources() {
    try {
      const response = await fetch("/api/resources"); // fetch from api
      const data = await response.json();
      
      // Check if the fetched data is an array. If not, set resources to an empty array and exit the function.
      if (!Array.isArray(data)) {
        setResources([]);
        return;
      }
     
      setResources(data);
      //stores the fetched data in localStorage under the key 'resourcecache' as a JSON string.
      localStorage.setItem(RESOURCE_CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching resources:", error);
      setResources([]);
    }
  }
  return resources;
}