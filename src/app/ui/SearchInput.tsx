
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import TextField from "@mui/material/TextField";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || ""; // Get the 'query' from the URL (default to empty string if not found)

  const [inputValue, setInputValue] = useState(currentQuery); // Handles input without affecting search results

  // update url search parameter when user types in the search box (live search)
  // Debounce effect for updating the URL (prevents excessive re-renders)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // to update results without lagging.
      const params = new URLSearchParams(window.location.search); // Access the current URL's query parameters
      if (inputValue.trim()) {
        params.set("query", inputValue.trim());
      } else {
        params.delete("query");
      }
      router.push(`/?${params.toString()}`); // Update URL search params
    }, 10); // delay live search updates (debounce)
    return () => clearTimeout(debounceTimer); // cleanup debounce
  }, [inputValue, router]);


  return (
    <form>
      <TextField
        id="search-bar"
        type="search"
        placeholder="Search name or location"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        variant="outlined"
        className="w-full max-w-2xl h-14 bg-white rounded-xl border-2 border-gray-300 px-6 text-base shadow-md transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e5e7eb',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#60a5fa',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
              borderWidth: '2px',
            },
          },
        }}
      />
    </form>
  );
}
