'use client';

import { useState, useEffect } from "react";
import FilterSidebar from "./filters/FilterSidebar";
import ResourceListPanel from "./resources/ResourceListPanel";
import MapView from "./map/Map";
import type { Resource } from "@/app/types/resource";

interface HomeClientProps {
  initialResources: Resource[];
}

export default function HomeClient({ initialResources }: HomeClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(initialResources);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [reviewResource, setReviewResource] = useState<Resource | null>(null);

  // Effect to filter resources when filters change
  useEffect(() => {
    console.log('Selected Boroughs:', selectedBoroughs);
    console.log('Initial Resources:', initialResources.map(r => r.city));
    
    const filtered = initialResources.filter((resource) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(
          (resource.ResourceCategory?.name ?? "").toLowerCase()
        );
      
      const boroughMatch =
        selectedBoroughs.length === 0 ||
        selectedBoroughs.some(borough => {
          const match = resource.city?.toLowerCase().trim() === borough.toLowerCase().trim();
          console.log(`Comparing ${resource.city} with ${borough}: ${match}`);
          return match;
        });

      return categoryMatch && boroughMatch;
    });

    console.log('Filtered Resources:', filtered.map(r => r.city));
    setFilteredResources(filtered);
  }, [initialResources, selectedCategories, selectedBoroughs]);

  const handleToggleDetails = (resource: Resource) => {
    if (selectedResource?.id === resource.id) {
      setSelectedResource(null);
    } else {
      setEditResource(null);
      setSelectedResource(resource);
    }
  };

  const handleSuggestEdit = (resource: Resource) => {
    if (editResource?.id === resource.id) {
      setEditResource(null);
    } else {
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
      <FilterSidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedBoroughs={selectedBoroughs}
        setSelectedBoroughs={setSelectedBoroughs}
      />

      <ResourceListPanel
        selectedCategories={selectedCategories}
        selectedBoroughs={selectedBoroughs}
        setFilteredResources={setFilteredResources}
        filteredResources={filteredResources}
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
