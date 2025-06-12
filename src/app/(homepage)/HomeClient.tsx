/**
 * main client-side component for the homepage of the Himalayan Connect NYC application.
 * It manages the state and logic for the resource filtering and display.

 */

"use client";

// import { Suspense, useState } from "react";
import { useState } from "react";
import FilterSidebar from "./filters/FilterSidebar"; // FilterSidebar component for resource filtering
import ResourceListPanel from "./resources/ResourceListPanel"; // ResourceListPanel component for resource list display
import MapView from "./map/Map"; // MapView component for map display
import type { Resource } from "@/app/lib/types"; // Resource type definition
// import Loading from "./loading";

interface HomeClientProps {
  initialResources: Resource[];
}

export default function HomeClient({ initialResources }: HomeClientProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(initialResources);

  const handleViewDetails = (resource: Resource) => {
    if (selectedResource?.id === resource.id) {
      setSelectedResource(null);
    } else {
      setEditResource(null);
      setSelectedResource(resource);
    }
  };

  const handleCloseDetails = () => {
    setSelectedResource(null);
  };

  const handleSuggestEdit = (resource: Resource) => {
    if (editResource?.id === resource.id) {
      setEditResource(null);
    } else {
      setSelectedResource(null);
      setEditResource(resource);
    }
  };

  const handleEditClose = () => {
    setEditResource(null);
  };

  return (
    // render filter sidebar, resource list panel middle, and map view right
    <div className="flex flex-col md:flex-row h-auto text-sm lg:text-sm md:h-[calc(100vh-90px)]">
      {/* filter sidebar */}
      <FilterSidebar
        resources={initialResources}
        onFilterChangeAction={setFilteredResources}
      />
      {/* <Suspense fallback={<Loading />}> */}
      {/* resource list panel */}
      <ResourceListPanel
        filteredResources={filteredResources}
        onViewDetailsAction={handleViewDetails}
        // isLoading={false}
      />
      {/* </Suspense> */}

      <MapView
        resources={filteredResources}
        selectedResource={selectedResource}
        editResource={editResource}
        onSuggestEditAction={handleSuggestEdit}
        onCloseAction={handleCloseDetails}
        onEditCloseAction={handleEditClose}
      />
    </div>
  );
}
