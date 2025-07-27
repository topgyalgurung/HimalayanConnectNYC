/**
 * SearchInput Component
 *
 *  The user types into this input field, and the search query is updated instantly.
 * The query is saved in the browser's URL as ?query=value, and whenever the user types,
 * it updates the URL and triggers a re-render in the ResourceList component,
 * @returns filtered result
 */
// note: make the search query shareable via the URL
// add debounce hook for better search performance to prevent excessive re-rendering

"use client";
// import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({placeholder}: {placeholder: string}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term){
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);



  return (
    <form>
      <TextField
        id="search-bar"
        placeholder={placeholder}
        defaultValue={searchParams.get("query").toString()}
        onChange={(e) => handleSearch(e.target.value)}
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
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </form>
  );
}
