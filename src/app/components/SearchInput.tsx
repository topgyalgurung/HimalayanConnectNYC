"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 *  The user types into this input field, and the search query is updated instantly.
 * The query is saved in the browser’s URL as ?query=value, and whenever the user types,
 * it updates the URL and triggers a re-render in the ResourceList component,
 * @returns filtered result
 */
// note: make the search query shareable via the URL
// add debounce hook for better search performance to prevent excessive re-rendering

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || ""; // Get the 'query' from the URL (default to empty string if not found)

  const [searchQuery, setSearchQuery] = useState(currentQuery); //hold the search query in the input field
  const [inputValue, setInputValue] = useState(currentQuery); // Handles input without affecting search results

  // sync input field with url on page load
  // useEffect(() => {
  //   setInputValue(currentQuery);
  //   setSearchQuery(currentQuery); // update state when url's query changes
  // }, [currentQuery]);

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
      setSearchQuery(inputValue.trim());
    }, 10); // delay live search updates (debounce)
    return () => clearTimeout(debounceTimer); // cleanup debounce
  }, [inputValue, router]);

  // Function to handle manual search submission
  // const handleSearchSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSearchQuery(inputValue.trim()); // set search query for results
  // };

  // Handle clearing the search input and results
  const handleClear = () => {
    setInputValue(""); // Clear input
    setSearchQuery(""); // Clear search results
    router.push("/"); // Reset URL
  };

  return (
    <form className="flex space-x-2">
      <input
        type="search"
        placeholder="Search name, category, or location"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-2 border-gray-300 bg-white h-12 px-7  rounded-lg text-m focus:outline-none focus:border-yellow-500   w-full max-w-2xl"
      />
      {/* <button
        type="submit"
        className="font-bold bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button> */}
      {/* <button
        type="button"
        onClick={handleClear}
        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
      >
        Clear
      </button> */}
    </form>
  );
}
