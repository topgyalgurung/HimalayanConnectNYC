"use client";

import { useState } from "react";

import ResourceFilter from "./filters/ResourceFilter";
import BoroughFilter from "./filters/BoroughFilter";
import ResourceList from "./resources/ResourceList";
import type { Resource } from "@/app/types/resource";

import MapView from "@/app/components/map/Map";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // for category filter
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]); // for borough filter
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]); // storing filtered resources based on the search query
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  ); // moved to parent from ResourceCard to show details
  const [editResource, setEditResource] = useState<Resource | null>(null); // for suggest edit
  const [reviewResource, setReviewResource] = useState<Resource | null>(null);

  const handleToggleDetails = (resource: Resource) => {
    if (selectedResource?.id === resource.id) {
      setSelectedResource(null); // close if already selected
    } else {
      // if selecting resourceDetails close editresource card
      setEditResource(null);
      setSelectedResource(resource); // open if different or closed
    }
  };

  const handleSuggestEdit = (resource: Resource) => {
    if (editResource?.id === resource.id) {
      setEditResource(null);
    } else {
      // if selecting editResourceCard close resourceDetails card
      setSelectedResource(null);
      setEditResource(resource);
    }
  };

  const handleReviewResource = (resource: Resource) => {
    if (reviewResource?.id === resource.id) {
      setReviewResource(null);
    } else {
      setReviewResource(resource);
    }
  };

  return (
    <div className="flex h-[calc(100vh-90px)] text-black p-1">
      {/* Left: Filter Section */}

      <aside className="w-full md:w-[20%] pl-4 bg-white shadow-md flex flex-col overflow-hidden">
        <h2 className="text-lg text-center font-bold text-black mb-2 sticky top-0 z-10 p-2 shadow bg-white">
          FILTERS
        </h2>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          <ResourceFilter
            onFilterChangeAction={setSelectedCategories}
            selectedCategories={selectedCategories}
          />
          <BoroughFilter
            onFilterChangeAction={setSelectedBoroughs}
            selectedBoroughs={selectedBoroughs}
          />
        </div>
      </aside>

      {/* Middle: Resource List */}

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
            onViewDetails={handleToggleDetails} // pass down to resourceList
            onSuggestEdit={handleSuggestEdit}
            onReviewClick={handleReviewResource}
          />
        </main>
      </aside>

      {/* Right: Map Display */}
      <aside className="w-[50%] bg-white shadow-md pl-4 flex flex-col h-full border-2 border-gray-300 ">
        <div className="flex-1 relative border border-gray-400 rounded-lg overflow-hidden">
          <MapView
            resources={filteredResources}
            selectedResource={selectedResource}
            reviewResource={reviewResource}
            onReviewResource={setReviewResource}
            editResource={editResource}
            onSuggestEdit={handleSuggestEdit}
            onCloseAction={() => setSelectedResource(null)}
            onEditCloseAction={() => setEditResource(null)}
            onReviewCloseAction={() => setReviewResource(null)}
          />
        </div>
      </aside>
    </div>
  );
}
