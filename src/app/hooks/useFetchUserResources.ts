import { useState, useEffect } from "react";
import type { Resource } from "../lib/types";

export function useFetchUserResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [favorites, setFavorites] = useState<Resource[]>([]);

  useEffect(() => {
    fetchUserResources();
  }, []);

  async function fetchUserResources() {
    try {
      console.log("Fetching user resources from API...");
      const response = await fetch("/api/resources/user", {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || typeof data !== 'object') {
        console.error("API returned invalid data:", data);
        setResources([]);
        setFavorites([]);
        return;
      }
      
      setResources(data.resources || []);
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Error fetching user resources:", error);
      setResources([]);
      setFavorites([]);
    }
  }

  return { resources, favorites, refetch: fetchUserResources };
}
