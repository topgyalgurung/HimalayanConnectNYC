// src/app/(homepage)/resources/ResourceListPanel.tsx
/**
 * ResourceListPanel Component
 *
 * This component is the resource list panel for the homepage of the Himalayan Connect NYC application.
 * It displays the list of resources in a sidebar.
 * 
 */

"use client";

import ResourceList from "./ResourceList";
import type { Resource } from "@/app/lib/types";

interface ResourceListPanelProps {
  filteredResources: Resource[];
  onViewDetails: (resource: Resource) => void;
}

export default function ResourceListPanel({
  filteredResources,
  onViewDetails,
}: ResourceListPanelProps) {
  return (
    <aside className="w-[30%] pl-4 flex-1 flex flex-col min-h-0 mb-4">
      <h3 className="text-lg px-4 text-center font-bold text-white bg-blue-500 mb-2 sticky top-0 z-10 p-2 shadow">
        RESOURCES
      </h3>
      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto mb-4">
        <ResourceList
          filteredResources={filteredResources}
          onViewDetails={onViewDetails}
        />
      </main>
    </aside>
  );
}
