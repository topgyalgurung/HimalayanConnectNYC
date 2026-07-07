"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchInputProps {
  placeholder?: string;
}

const DEBOUNCE_MS = 400;

export default function SearchInput({ placeholder = "Search..." }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlQuery = searchParams.get("query") ?? "";
  const [localValue, setLocalValue] = useState(urlQuery);

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term.trim()) {
        params.set("query", term.trim());
      } else {
        params.delete("query");
      }
      params.delete("page");
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  useEffect(() => {
    setLocalValue(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== urlQuery) {
        handleSearch(localValue);
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localValue, urlQuery, handleSearch]);

  const handleClear = () => {
    setLocalValue("");
    handleSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(localValue);
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClear();
    }
  };

  const handleBlur = () => {
    if (localValue !== urlQuery) {
      handleSearch(localValue);
    }
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        autoComplete="off"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-9 text-sm outline-2 placeholder:text-gray-500 [&::-webkit-search-cancel-button]:hidden"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      {localValue && (
        <button
          type="button"
          aria-label="Clear search"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
