"use client";

import { useState } from "react";

import ResourceFilter from "./filters/ResourceFilter";
import BoroughFilter from "./filters/BoroughFilter";
import ResourceList from "./resources/ResourceList";
import type { Resource } from "@/app/types/resource"; // Update this import

// import { MapProvider } from "@/app/providers/MapProvider";
import { MapView } from "@/app/components/map/Map";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]); // storing filtered resources based on the search query

  return (
    <div className="flex h-[calc(100vh-4rem)] text-black">
      {/* left: filter section  */}
      <aside className="w-52 bg-white shadow-md p-4 flex flex-col">
        <h2 className="size-9 font-bold text-blue-600"> Filters</h2>
        <ResourceFilter
          onFilterChange={setSelectedCategories}
          selectedCategories={selectedCategories}
        />
        <BoroughFilter
          onFilterChange={setSelectedBoroughs}
          selectedBoroughs={selectedBoroughs}
        />
      </aside>

      {/* Middle Section: Resource List */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
          <ResourceList
            selectedCategories={selectedCategories}
            selectedBoroughs={selectedBoroughs}
            setFilteredResources={setFilteredResources}
            filteredResources={filteredResources}
          />
        </main>
      </div>

      {/* Right: Map Display  */}
      <aside className="w-[800px] bg-white shadow-md p-4 flex flex-col">
        <MapView resources={filteredResources} />
      </aside>
    </div>
  );
}
