// src/app/(homepage)/resources/ResourceListPanel.tsx
/**
 * resource list panel for the homepage of the Himalayan Connect NYC application.
 * It displays the list of resources in a sidebar.
 *
 */

"use client";

// import { useState } from "react";
import ResourceList from "./ResourceList";
import type { Resource } from "@/app/lib/types";

import dynamic from "next/dynamic";

interface ResourceListPanelProps {
  filteredResources: Resource[];
  onViewDetailsAction: (resource: Resource) => void;
}
const SearchInput = dynamic(
  () => import("../NavMenu/SearchInput/SearchInput"),
  {
    ssr: false,
  }
);

export default function ResourceListPanel({
  filteredResources,
  onViewDetailsAction,
  // onSuggestEditAction,
  // editResource,
  // onReviewResourceAction,
  // onCloseAction,
  // onEditCloseAction,
  // onReviewCloseAction,
  // selectedResource,

  // onViewDetailsAction,
}: ResourceListPanelProps) {
  // const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  // const pathname = usePathname();

    // const handleViewDetails = (resource: Resource) => {
    //   setSelectedResource(resource);
    // };

  return (
    <>
      {/* Search input  */}
      <div className="mb-6">
        <SearchInput />
      </div>

      <h2 className="text-lg text-center font-bold text-black mb-2 top-0 z-10 p-2 shadow bg-white">
        RESOURCES
      </h2>

      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto mb-4">
        <ResourceList
          filteredResources={filteredResources}
          onViewDetailsAction={onViewDetailsAction}
        />
      
      </main>
    </>
  );
}
