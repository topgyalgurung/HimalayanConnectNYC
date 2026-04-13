import { useState, useEffect, useCallback } from "react";
import type { AdminUserListItem, User } from "@/app/lib/types";

export function useFetchUser() {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching user from API ...");
      const response = await fetch("/api/users", {
        // cache: 'no-cache' // safer for user-specific info
        cache: "no-store", // on demand: not to cache anything and get fresh data everytime
      });
      // console.log("API Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      setData(userData);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  return {
    data,
    isLoading,
    error,
    refetch: fetchUser,
  };
}

export function useFetchAdminUsers() {
  const [data, setData] = useState<AdminUserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAdminUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/users?list=all", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users = await response.json();
      setData(Array.isArray(users) ? users : []);
    } catch (error) {
      console.error("Error fetching admin user list:", error);
      setData([]);
      setError(error instanceof Error ? error : new Error("Failed to fetch users"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminUsers();
  }, [fetchAdminUsers]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchAdminUsers,
  };
}
