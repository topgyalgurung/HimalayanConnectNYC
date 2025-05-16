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
  onViewDetailsAction: (resource: Resource) => void;
}

export default function ResourceListPanel({
  filteredResources,
  onViewDetailsAction,
}: ResourceListPanelProps) {
  return (
    <aside className="w-full md:w-[35%] text-md lg:w-[30%] pl-0 md:pl-4 flex-1 flex flex-col min-h-0 mb-4">
      <h2 className="text-lg text-center font-bold text-black mb-2 top-0 z-10 p-2 shadow bg-white">
        RESOURCES
      </h2>
      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto mb-4">
        <ResourceList
          filteredResources={filteredResources}
          onViewDetailsAction={onViewDetailsAction}
        />
      </main>
    </aside>
  );
}