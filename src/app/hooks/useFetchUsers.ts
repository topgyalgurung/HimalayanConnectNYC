
import { useState, useEffect } from 'react';
import type { User } from '@/app/types/user';

export function useFetchUser() {
    const [user, setUser] = useState<User | null >(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                console.log("Fetching user from API ...");
                const response = await fetch('/api/users', {
                    cache: 'no-cache' // safer for user-specific info
                    // {cache: 'no-store' // on demand: not to cache anything and get fresh data everytime
                });
                console.log("API Response status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
      
                const data = await response.json();
                console.log("Fetched user:", data);
                setUser(data);

            } catch (error) {
                console.error("Error fetching resources:", error);
                setUser(null);
            }
        }
        fetchUser();
    }, []);
    return user;
}