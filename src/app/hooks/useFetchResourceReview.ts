import type { ResourceReview } from '@/app/lib/types';
import { useState, useEffect, useCallback } from 'react';

export function useFetchResourceReview(resourceId: number | null) {
    const [reviews, setReviews] = useState<ResourceReview[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // memoize fetchReview function to prevent unnecessary re-renders
    const fetchReview = useCallback(async () => {
        if (!resourceId) return;
        
        setIsLoading(true);
        try {
            const response = await fetch(`/api/resources/review/${resourceId}`);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]);
        } finally {
            setIsLoading(false);
        }
    }, [resourceId]);

    useEffect(() => {
        fetchReview();
    }, [fetchReview]);

    return { reviews, refetch: fetchReview, isLoading };
}