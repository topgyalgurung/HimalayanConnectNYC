"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput({ placeholder }: { placeholder: string }) {
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
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
