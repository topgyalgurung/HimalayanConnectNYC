// src/app/hooks/useDeleteResource.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteItemOptions {
  refetchUser?: () => Promise<void>; // Updated to reflect async refetch
}

export function useDeleteItem() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const deleteItem = async (path: string, id:string | number,options: DeleteItemOptions = {}) => {
    if (deletingId) return;

    setDeletingId(id.toString());
    try {
      const res = await fetch(`/api/${path}/${id}`, {
        method: "DELETE",
       
      });

      if (!res.ok) {
        throw new Error(`Failed to delete ${path.slice(0, -1)}`); // eg. resource, suggestion
      }

      toast.success(`${path.slice(0, -1)} deleted successfully!`);
    // Trigger refetch of user data if provided
    if (options.refetchUser) {
      await options.refetchUser();
    } else {
      // Fallback to page refresh
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