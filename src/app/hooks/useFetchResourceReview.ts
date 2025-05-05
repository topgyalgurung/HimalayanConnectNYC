
import type { ResourceReview } from '../types/review';
import { useState, useEffect } from 'react';

export function useFetchResourceReview(resourceId:number | null) {
    const [reviews, setReviews] = useState<ResourceReview[]>([]);

    useEffect(() => {
        if (!resourceId) return;
        fetchReview();
      }, [resourceId]);

    async function fetchReview() {
        try {
            const response = await fetch(`/api/resources/review/${resourceId}`)
            const data = await response.json()
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]);
            
        }
    }
    return {reviews, refetch:fetchReview}

}