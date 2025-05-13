// fetch ResourceEditSuggestion

import { useState, useEffect } from "react";
import type { ResourceEditSuggestion } from "@/app/lib/types";

export function useFetchResourceEdit() {
    const [editResources, setEditResources] = useState<ResourceEditSuggestion[]>([]);
    
    useEffect(() => {     
        fetchEditResources();
    }, []);
    async function fetchEditResources() {
        try {
            // console.log("Fetching edit resources data from API ...")
            const response = await fetch('api/resources/edit')
            const data = await response.json()
            setEditResources(data);
        } catch (error) {
            console.error("Error fetching resources:", error);
            setEditResources([])
        }
    
    }
    return { editResources, refetch: fetchEditResources };
   
}