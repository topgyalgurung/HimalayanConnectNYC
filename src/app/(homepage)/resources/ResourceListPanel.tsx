// src/app/(homepage)/resources/ResourceListPanel.tsx
"use client";

import ResourceList from "./ResourceList";
import type { Resource } from "@/app/types/resource";

interface ResourceListPanelProps {
  selectedCategories: string[];
  selectedBoroughs: string[];
  setFilteredResources: (resources: Resource[]) => void;
  filteredResources: Resource[];
  onViewDetails: (resource: Resource) => void;
  onSuggestEdit: (resource: Resource) => void;
  onReviewClick: (resource: Resource) => void;
}

export default function ResourceListPanel({
  selectedCategories,
  selectedBoroughs,
  setFilteredResources,
  filteredResources,
  onViewDetails,
  onSuggestEdit,
}: //   onReviewClick,
ResourceListPanelProps) {
  return (
    <aside className="w-[30%] pl-4 flex-1 flex flex-col min-h-0 mb-4">
      <h3 className="text-lg px-4 text-center font-bold text-white bg-blue-500 mb-2 sticky top-0 z-10 p-2 shadow">
        RESOURCES
      </h3>
      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto mb-4">
        <ResourceList
          selectedCategories={selectedCategories}
          selectedBoroughs={selectedBoroughs}
          setFilteredResources={setFilteredResources}
          filteredResources={filteredResources}
          onViewDetails={onViewDetails}
          onSuggestEdit={onSuggestEdit}
          //   onReviewClick={onReviewClick}
        />
      </main>
    </aside>
  );
}
