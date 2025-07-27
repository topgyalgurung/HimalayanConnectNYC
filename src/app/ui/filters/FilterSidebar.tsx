

"use client";

import { useState, useEffect } from "react";
import ResourceFilter from "./ResourceFilter";
import BoroughFilter from "./BoroughFilter";
import type { Resource } from "@/app/lib/types";

interface FilterSidebarProps {
  resources: Resource[];
  onFilterChangeAction: (filteredResources: Resource[]) => void;
}

export default function FilterSidebar({
  resources,
  onFilterChangeAction,
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

    onFilterChangeAction(filtered);
  }, [resources, selectedCategories, selectedBoroughs, onFilterChangeAction]);

  return (
    <>
    <div className="flex flex-col h-[95%]">
      
      <div className="flex-1 text-sm overflow-y-auto px-2 py-1 custom-scrollbar">
        <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
          {/* Resource name filter */}
          <div className="w-1/2 md:w-full">
            <ResourceFilter
              selectedCategories={selectedCategories}
              onFilterChangeAction={setSelectedCategories}
            />
          </div>
          <div className="w-1/2 md:w-full">
            {/* city borough name filter  */}
            <BoroughFilter
              selectedBoroughs={selectedBoroughs}
              onFilterChangeAction={setSelectedBoroughs}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}


