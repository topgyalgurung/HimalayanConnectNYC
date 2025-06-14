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
// import ResourceDetailsCard from "@/app/components/features/ResourceDetailsCard";
// import SearchInput from "../NavMenu/SearchInput/SearchInput";
import dynamic from "next/dynamic";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Button from "@mui/material/Button";

interface ResourceListPanelProps {
  filteredResources: Resource[];
  onViewDetailsAction: (resource: Resource) => void;
  // onSuggestEditAction: (resource: Resource) => void;
  // onReviewResourceAction: (resource: Resource | null) => void;
  // onCloseAction: (resource: Resource | null) => void;
  // onEditCloseAction: (resource: Resource | null) => void;
  // onReviewCloseAction: (resource: Resource | null) => void;
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

      {/* might test out putting add resource here later */}
      {/* add resource  */}
      {/* <Link
          href="/resources/add"
          className={`flex items-center text-blue-500 px-1 py-1 rounded-lg text-sm font-semibold transition-all 
          ${pathname === "/add-resource" ? "text-blue-500" : "text-blue"}
        `}
        >
          <Button
            variant="contained"
            color="primary"
            // optional: adds margin-left for spacing
          >
            Add Resource ➕
          </Button>
        </Link> */}

      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto mb-4">
        <ResourceList
          filteredResources={filteredResources}
          onViewDetailsAction={onViewDetailsAction}
          // onViewDetailsAction={handleViewDetails}
        />

        {/* {selectedResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <ResourceDetailsCard
              resource={selectedResource}
              editResource={editResource}
              // selectedResource={selectedResource}
              onSuggestEdit={onSuggestEditAction}
              onReviewResource={onReviewResourceAction}
              onCloseAction={() => setSelectedResource(null)}
            // onEditCloseAction={() => onEditCloseAction(null)}
            // onReviewCloseAction={() => onReviewCloseAction(null)}
            />
          </div>
        )} */}
      
      </main>
    </>
  );
}
