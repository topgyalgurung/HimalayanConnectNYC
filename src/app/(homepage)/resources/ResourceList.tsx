"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchResources } from "@/app/hooks/useFetchResources";
import ResourceCard from "./ResourceCard";
import type { Resource } from "@/app/types/resource"; // Update this import

interface ResourceListProps {
  selectedCategories: string[];
  selectedBoroughs: string[];
  setFilteredResources: (resources: Resource[]) => void; // Add setter for filtered resources
  filteredResources: Resource[]; // Add filteredResources prop
  onViewDetails: (resource: Resource) => void;
  onSuggestEdit: (resource: Resource) => void;
  // onReviewClick: (resource: Resource) => void;
  // setLocations: (locations: { latitude: number; longitude: number }[]) => void;
}

const ResourceList = ({
  selectedCategories,
  selectedBoroughs,
  setFilteredResources,
  onViewDetails,
  onSuggestEdit,
  // onReviewClick,
  filteredResources, // Use the passed filteredResources
}: ResourceListProps) => {
  const searchParams = useSearchParams(); // access search params from url /resources?query=name
  const searchQuery = searchParams.get("query")?.toLowerCase() || ""; // Get query from URL and convert to lowercase

  const { resources } = useFetchResources(); // use hook to fetch data (it either )
  console.log("fetched resources ", resources);

  // Effect to filter resources when searchParams, resources, or filters change
  useEffect(() => {
    if (!Array.isArray(resources)) return; // Add safety check
    const searchQueryLower = searchQuery.trim().toLowerCase();

    const filtered = resources.filter((resource) => {
      // Check if the resource name or address matches the search query
      const nameMatch = resource.name?.toLowerCase().includes(searchQueryLower);
      const addressMatch = resource.address
        ?.toLowerCase()
        .includes(searchQueryLower);
      const locationMatch = resource.city
        ?.toLowerCase()
        .includes(searchQueryLower);

      // Check if the resource belongs to a selected category (or allow all if none selected)
      const categoryMatch =
        selectedCategories.length === 0 || // Allow all if no category is selected
        selectedCategories.includes(
          (resource.ResourceCategory?.name ?? "").toLowerCase()
        );
      // Check if the resource is in a selected borough (or allow all if none selected)
      const boroughMatch =
        selectedBoroughs.length === 0 ||
        selectedBoroughs.includes(resource.city);
      // A resource is included if it matches name/address and selected category and borough
      return (
        (nameMatch || addressMatch || locationMatch) &&
        categoryMatch &&
        boroughMatch
      );
    });
    setFilteredResources(filtered); // Update state with filtered resources
  }, [
    searchParams,
    resources,
    selectedCategories,
    selectedBoroughs,
    searchQuery,
    setFilteredResources,
  ]); // Dependencies: re-run when these values change

  // Filter resources based on search query
  const searchFilteredResources = filteredResources.filter((resource) => {
    const searchQueryLower = searchQuery.trim().toLowerCase();
    const nameMatch = resource.name?.toLowerCase().includes(searchQueryLower);
    const addressMatch = resource.address?.toLowerCase().includes(searchQueryLower);
    const locationMatch = resource.city?.toLowerCase().includes(searchQueryLower);

    return nameMatch || addressMatch || locationMatch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Display the filtered resources using the ResourceCard component */}
      <ResourceCard
        resources={searchFilteredResources}
        onViewDetails={onViewDetails}
        onSuggestEdit={onSuggestEdit}
        // onReviewClick={onReviewClick}
      />
    </div>
  );
};

export default ResourceList;
