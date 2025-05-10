// src/app/(homepage)/filters/FilterSidebar.tsx

"use client";

import { useState, useEffect } from "react";
import ResourceFilter from "./ResourceFilter";
import BoroughFilter from "./BoroughFilter";
import type { Resource } from "@/app/types/resource";

interface FilterSidebarProps {
  resources: Resource[];
  onFilteredResourcesChange: (filteredResources: Resource[]) => void;
}

export default function FilterSidebar({
  resources,
  onFilteredResourcesChange,
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);

// filtering logic moved closer to the component from homeclient before 
  useEffect(() => {
    const filtered = resources.filter((resource) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(
          (resource.ResourceCategory?.name ?? "").toLowerCase()
        );

      const boroughMatch =
        selectedBoroughs.length === 0 ||
        selectedBoroughs.some(borough => 
          resource.city?.toLowerCase().trim() === borough.toLowerCase().trim()
        );

      return categoryMatch && boroughMatch;
    });

    onFilteredResourcesChange(filtered);
  }, [resources, selectedCategories, selectedBoroughs, onFilteredResourcesChange]);

  return (
    <aside className="w-full md:w-[18%] pl-4 bg-white shadow-md flex flex-col overflow-hidden max-h-screen">
      <h2 className="text-lg text-center font-bold text-black mb-2 sticky top-0 z-10 p-2 shadow bg-white">
        FILTERS
      </h2>
      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        <ResourceFilter
          selectedCategories={selectedCategories}
          onFilterChangeAction={setSelectedCategories}
        />
        <BoroughFilter
          selectedBoroughs={selectedBoroughs}
          onFilterChangeAction={setSelectedBoroughs}
        />
      </div>
    </aside>
  );
}
