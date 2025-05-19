/**
 * main client-side component for the homepage of the Himalayan Connect NYC application.
 * It manages the state and logic for the resource filtering and display.

 */

"use client";

import { Suspense, useState } from "react";
import FilterSidebar from "./filters/FilterSidebar"; // FilterSidebar component for resource filtering
import ResourceListPanel from "./resources/ResourceListPanel"; // ResourceListPanel component for resource list display
import MapView from "./map/Map"; // MapView component for map display
import type { Resource } from "@/app/lib/types"; // Resource type definition
import Loading from "./loading";

interface HomeClientProps {
  initialResources: Resource[];
}

export default function HomeClient({ initialResources }: HomeClientProps) {
  const [filteredResources, setFilteredResources] =
    useState<Resource[]>(initialResources); // state for filtered resources
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  ); // state for selected resource
  const [editResource, setEditResource] = useState<Resource | null>(null); // state for edit resource
  const [reviewResource, setReviewResource] = useState<Resource | null>(null); // state for review resource

  // toggles to close or open the details of a resource
  const handleToggleDetails = (resource: Resource) => {
    if (selectedResource?.id === resource.id) {
      setSelectedResource(null);
    } else {
      setEditResource(null);
      setSelectedResource(resource);
    }
  };

  // open or close the edit resource
  const handleSuggestEdit = (resource: Resource) => {
    if (editResource?.id === resource.id) {
      setEditResource(null);
    } else {
      setSelectedResource(null);
      setEditResource(resource);
    }
  };

  // open or close the review resource
  // const handleReviewResource = (resource: Resource) => {
  //   if (reviewResource?.id === resource.id) {
  //     setReviewResource(null);
  //   } else {
  //     setReviewResource(resource);
  //   }
  // };

  return (
    // render filter sidebar, resource list panel middle, and map view right
    <div className="flex flex-col md:flex-row h-auto text-sm lg:text-sm md:h-[calc(100vh-90px)] ">
      <FilterSidebar
        resources={initialResources}
        onFilteredResourcesChange={setFilteredResources}
      />
      <Suspense fallback={<Loading />}>
        <ResourceListPanel
          filteredResources={filteredResources}
          onViewDetailsAction={handleToggleDetails}
        />
      </Suspense>

      <MapView
        resources={filteredResources}
        selectedResource={selectedResource}
        reviewResource={reviewResource}
        onReviewResourceAction={setReviewResource}
        editResource={editResource}
        onSuggestEditAction={handleSuggestEdit}
        onCloseAction={() => setSelectedResource(null)}
        onEditCloseAction={() => setEditResource(null)}
        onReviewCloseAction={() => setReviewResource(null)}
      />
    </div>
  );
}
