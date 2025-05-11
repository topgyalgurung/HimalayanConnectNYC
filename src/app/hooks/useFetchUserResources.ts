import { useState, useEffect } from "react";
import type { Resource } from "../lib/types";

export function useFetchUserResources() {
  const [resources, setResources] = useState<Resource[]>([]);

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
      
      if (!Array.isArray(data)) {
        console.error("API returned non-array data:", data);
        setResources([]);
        return;
      }
      
      setResources(data);
    } catch (error) {
      console.error("Error fetching user resources:", error);
      setResources([]);
    }
  }

  return { resources, refetch: fetchUserResources };
}
