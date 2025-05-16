// src/app/(homepage)/filters/FilterSidebar.tsx
/**
 * FilterSidebar Component
 *
 * This component is the filter sidebar for the homepage of the Himalayan Connect NYC application.
 * It displays the filter options for the resources.
 *
 */

"use client";

import { useState, useEffect } from "react";
import ResourceFilter from "./ResourceFilter";
import BoroughFilter from "./BoroughFilter";
import type { Resource } from "@/app/lib/types";

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
        selectedBoroughs.some(
          (borough) =>
            resource.city?.toLowerCase().trim() === borough.toLowerCase().trim()
        );

      return categoryMatch && boroughMatch;
    });

    onFilteredResourcesChange(filtered);
  }, [
    resources,
    selectedCategories,
    selectedBoroughs,
    onFilteredResourcesChange,
  ]);

  return (
    <aside className="w-full top-0 left-0 md:w-[25%] lg:w-[20%] bg-white shadow-md flex flex-col h-[calc(92vh-90px)]">
      <div className="flex flex-col h-full">
        <h2 className="text-lg text-center font-bold text-black p-2 top-0 z-10 bg-white border-b">
          FILTERS
        </h2>
        <div className="flex-1 text-sm overflow-y-auto px-2 py-1 space-y-2">
          <div>
            <ResourceFilter
              selectedCategories={selectedCategories}
              onFilterChangeAction={setSelectedCategories}
            />
          </div>
          <div>
            <BoroughFilter
              selectedBoroughs={selectedBoroughs}
              onFilterChangeAction={setSelectedBoroughs}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
