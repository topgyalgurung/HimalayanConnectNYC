/**
 * HomeClient Component 
 * 
 * This component is the main client-side component for the homepage of the Himalayan Connect NYC application.
 * It manages the state and logic for the resource filtering and display.
 * 
 * @param {Object} props - Component props
 * @param {Resource[]} props.initialResources - Initial resources to display
 * @returns {JSX.Element} The homepage component
 */

'use client';

import { useState } from "react";
import FilterSidebar from "./filters/FilterSidebar"; // FilterSidebar component for resource filtering  
import ResourceListPanel from "./resources/ResourceListPanel"; // ResourceListPanel component for resource list display
import MapView from "./map/Map"; // MapView component for map display
import type { Resource } from "@/app/types/resource"; // Resource type definition

interface HomeClientProps {
  initialResources: Resource[];
}

export default function HomeClient({ initialResources }: HomeClientProps) {
  const [filteredResources, setFilteredResources] = useState<Resource[]>(initialResources);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [reviewResource, setReviewResource] = useState<Resource | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);

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
  const handleReviewResource = (resource: Resource) => {
    if (reviewResource?.id === resource.id) {
      setReviewResource(null);
    } else {
      setReviewResource(resource);
    }
  };

  return (
    // render filter sidebar, resource list panel middle, and map view right
    <div className="flex h-[calc(100vh-90px)] text-black p-1">
      <FilterSidebar
        resources={initialResources}
        onFilteredResourcesChange={setFilteredResources}
      />

      <ResourceListPanel
        filteredResources={filteredResources}
        selectedCategories={selectedCategories}
        selectedBoroughs={selectedBoroughs}
        onViewDetails={handleToggleDetails}
        onSuggestEdit={handleSuggestEdit}
        onReviewClick={handleReviewResource}
      />

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
