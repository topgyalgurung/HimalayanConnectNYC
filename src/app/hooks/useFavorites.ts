"use client";

// On mount, it fetches the list of favorites and sets them.
// isFavorite(id) checks from fetched list.
//toggleFavorite(id) updates both backend and local.
/**
 * Custom hook for managing user favorites
 * Fetches favorites from the backend and provides functionality to check if a resource is a favorite
 * and to toggle a resource as a favorite
 * calls: /api/resources/favorite
 * returns: favoriteIds, isFavorite, toggleFavorite
 */

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/resources/favorite");
  
        if (!res.ok) {
          console.error("Failed to fetch favorites:", res.statusText);
          return;
        }
  
        const text = await res.text(); // ← read as text first
  
        if (!text) {
          console.warn("No favorites data returned.");
          return;
        }
  
        const data = JSON.parse(text);
  
        if (Array.isArray(data)) {
          setFavoriteIds(data.map((fav) => fav.resourceId));
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };
  
    fetchFavorites();
  }, []);

  const isFavorite = (resourceId: number) => {
    return favoriteIds.includes(resourceId);
  };

  const toggleFavorite = async (resourceId: number) => {
    try {
      const res = await fetch("/api/resources/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId }),
      });
      const data = await res.json();

      if (data.success) {
        if (data.liked) {
          setFavoriteIds((prev) => [...prev, resourceId]);
        } else {
          setFavoriteIds((prev) => prev.filter((id) => id !== resourceId));
        }
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return { favoriteIds, isFavorite, toggleFavorite };
}