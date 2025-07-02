// fetch ResourceEditSuggestion

import { useState, useEffect } from "react";
import type { ResourceEditSuggestion } from "@/app/lib/types";

export function useFetchResourceEdit() {
    const [editResources, setEditResources] = useState<ResourceEditSuggestion[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {     
        fetchEditResources();
    }, []);

    async function fetchEditResources() {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/resources/edit');
            
            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('Rate limit exceeded. Please try again later.');
                }
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch resources');
            }

            const data = await response.json();
            setEditResources(data);
        } catch (error) {
            console.error("Error fetching resources:", error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            setEditResources([]);
        } finally {
            setIsLoading(false);
        }
    }

    return { editResources, error, isLoading, refetch: fetchEditResources };
}