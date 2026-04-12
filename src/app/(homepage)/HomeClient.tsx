"use client";

import { useState } from "react";
import FilterSidebar from "@/app/ui/filters/FilterSidebar";
import ResourceListPanel from "@/app/ui/resources/ResourceListPanel";
import MapView from "@/app/ui/map/Map";
import type { Resource } from "@/app/lib/types";
import Pagination from "@/app/ui/resources/pagination";

interface HomeClientProps {
  initialResources: Resource[];
  totalPages: number;
  selectedCategories: string[];
  selectedBoroughs: string[];
}
export default function HomeClient({
  initialResources,
  totalPages,
  selectedCategories,
  selectedBoroughs,
}: HomeClientProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [hoveredResourceId, setHoveredResourceId] = useState<string | null>(
    null
  );

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
    <div className="flex flex-col md:flex-row h-auto text-sm lg:text-sm md:h-[calc(100vh-90px)] w-full">
      <aside className="w-full md:w-[30%] lg:w-[25%] bg-white shadow-md flex flex-col h-auto md:h-[calc(100vh-90px)] px-2 sm:px-6">
        <FilterSidebar
          selectedCategories={selectedCategories}
          selectedBoroughs={selectedBoroughs}
        />
      </aside>

      <aside className="w-full md:w-[40%] lg:w-[35%] pl-0 md:pl-4 flex flex-col min-h-0 mb-4">
        <ResourceListPanel
          filteredResources={initialResources}
          onViewDetailsAction={handleViewDetails}
          onResourceHover={setHoveredResourceId}
        />
        <div className="flex justify-center mb-3">
          <Pagination totalPages={totalPages} />
        </div>
      </aside>

      <aside className="w-full md:w-[40%] lg:w-[45%] bg-white shadow-md flex flex-col h-[500px] md:h-full border-2 border-gray-300">
        <MapView
          resources={initialResources}
          selectedResource={selectedResource}
          editResource={editResource}
          onSuggestEditAction={handleSuggestEdit}
          onCloseAction={handleCloseDetails}
          onEditCloseAction={handleEditClose}
          hoveredResourceId={hoveredResourceId}
        />
      </aside>
    </div>
  );
}
