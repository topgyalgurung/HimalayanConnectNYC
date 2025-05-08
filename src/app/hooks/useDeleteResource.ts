/**
 * Custom hook for deleting resources from the API
 * Makes DELETE request to /api/{path}/{id} endpoint
 * api/resources/edit/{id}
 * api/resources/review/{id}
 * api/resources/favorite/{id}
 * Handles loading state, success/error toasts, and data refetching
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteItemOptions {
  refetchUser?: () => Promise<void>;
  onSuccess?: () => void;
}

export function useDeleteItem() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const deleteItem = async (path: string, id: string | number, options: DeleteItemOptions = {}) => {
    if (deletingId) return;

    setDeletingId(id.toString());
    try {
      const res = await fetch(`/api/${path}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete`);
      }

      toast.success(`Deleted successfully!`);
      
      // Trigger refetch of user data if provided
      if (options.refetchUser) {
        await options.refetchUser();
      }
      
      // Call onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess();
      } else {
        // Fallback to page refresh if no onSuccess callback
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to delete ${path.slice(0, -1)}`);
    } finally {
      setDeletingId(null);
    }
  };

  return { deleteItem, deletingId };
}