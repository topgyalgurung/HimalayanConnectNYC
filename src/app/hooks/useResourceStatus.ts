import { useState } from 'react';
import { resourceService } from '../services/resourceService';

export const useResourceStatus = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (resourceId: string, newStatus: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await resourceService.updateResourceStatus(resourceId, newStatus);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateStatus,
    isLoading,
    error
  };
}; 