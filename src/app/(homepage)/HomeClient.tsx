"use client";

import { useState } from "react";

import FilterSidebar from "./filters/FilterSidebar";
import ResourceListPanel from "./resources/ResourceListPanel";
import type { Resource } from "@/app/types/resource";

import MapView from "./map/Map";
export default function Home({
  initialResources,
}: {
  initialResources: Resource[];
}) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [editResource, setEditResource] = useState<Resource | null>(null); // for suggest edit
  const [reviewResource, setReviewResource] = useState<Resource | null>(null); // review
  const [filteredResources, setFilteredResources] =
    useState<Resource[]>(initialResources); // storing filtered resources based on the search query

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // for category filter
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]); // for borough filter

  // to open/close card on click (view details button)
  const handleToggleDetails = (resource: Resource) => {
    if (selectedResource?.id === resource.id) {
      setSelectedResource(null); // close if already selected
    } else {
      // if selecting resourceDetails close edit resource card
      setEditResource(null);
      setSelectedResource(resource); // open if different or closed
    }
  };

  // to open suggestEdit form
  const handleSuggestEdit = (resource: Resource) => {
    if (editResource?.id === resource.id) {
      setEditResource(null);
    } else {
      // if selecting editResourceCard close resourceDetails card
      setSelectedResource(null);
      setEditResource(resource);
    }
  };

  return (
    <div className="flex h-[calc(100vh-90px)] text-black p-1">
      {/* Left: Filter Section */}
      <FilterSidebar
        selectedCategories={selectedCategories}
        selectedBoroughs={selectedBoroughs}
        onCategoryChangeAction={setSelectedCategories}
        onBoroughChangeAction={setSelectedBoroughs}
      />

      {/* Middle: Resource List */}

      <ResourceListPanel
        selectedCategories={selectedCategories}
        selectedBoroughs={selectedBoroughs}
        setFilteredResources={setFilteredResources}
        filteredResources={filteredResources}
        onViewDetailsAction={handleToggleDetails}
      />

      {/* Right: Map Display */}
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
  );
}
