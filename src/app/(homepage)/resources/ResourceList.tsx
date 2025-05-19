/**
 * resource list for the homepage of the Himalayan Connect NYC application.
 * It displays the list of resources in a sidebar.
 * 
 */

"use client";
import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
import ResourceCard from "./ResourceCard";
import type { Resource } from "@/app/lib/types";

interface ResourceListProps {
  filteredResources: Resource[];
  onViewDetailsAction: (resource: Resource) => void;
}

const ResourceList = ({
  filteredResources,
  onViewDetailsAction,
}: ResourceListProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() || "";

  // Filter resources based on search query only
  const searchFilteredResources = filteredResources.filter((resource) => {
    const searchQueryLower = searchQuery.trim().toLowerCase();
    const nameMatch = resource.name?.toLowerCase().includes(searchQueryLower);
    const addressMatch = resource.address
      ?.toLowerCase()
      .includes(searchQueryLower);
    const locationMatch = resource.city
      ?.toLowerCase()
      .includes(searchQueryLower);

      return nameMatch || addressMatch || locationMatch;

    // // Check if the resource belongs to a selected category (or allow all if none selected)
    // const categoryMatch =
    //   selectedCategories.length === 0 || // Allow all if no category is selected
    //   selectedCategories.includes(
    //     (resource.ResourceCategory?.name ?? "").toLowerCase()
    //   );

    // // Check if the resource is in a selected borough (or allow all if none selected)
    // const boroughMatch =
    //   selectedBoroughs.length === 0 ||
    //   selectedBoroughs.includes(resource.city ?? "");

    // // A resource is included if it matches name/address and selected category and borough
    // return (
    //   (nameMatch || addressMatch || locationMatch) &&
    //   categoryMatch &&
    //   boroughMatch
    // );
  });

  return (
    <div className="flex flex-col h-full">
      <ResourceCard
        resources={searchFilteredResources}
        onViewDetailsAction={onViewDetailsAction}
      />
    </div>
  );
};

export default ResourceList;
