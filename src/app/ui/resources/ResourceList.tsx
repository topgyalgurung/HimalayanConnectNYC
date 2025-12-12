/**
 * resource list for the homepage of the Himalayan Connect NYC application.
 * It displays the list of resources in a sidebar.
 *
 */

"use client";
import { useSearchParams } from "next/navigation";
import ResourceCard from "./ResourceCard";
import type { Resource } from "@/app/lib/types";
import { fetchFilteredResources } from "@/app/lib/data";

interface ResourceListProps {
  query?: string;
  page?: number;
  filteredResources: Resource[];
  onViewDetailsAction: (resource: Resource) => void;
  onResourceHover?: (resourceId: string | null) => void;
}

const ResourceList = ({
  query,
  page,
  filteredResources,
  onViewDetailsAction,
  onResourceHover,
}: ResourceListProps) => {
  // const searchParams = useSearchParams();
  // const searchQuery = searchParams.get("query")?.toLowerCase() || "";
  const searchFilteredResources = fetchFilteredResources(query, currentPage);

  // Filter resources based on search query only
  // const searchFilteredResources = filteredResources.filter((resource) => {
  //   const searchQueryLower = searchQuery.trim().toLowerCase();
  //   const nameMatch = resource.name?.toLowerCase().includes(searchQueryLower);
  //   const addressMatch = resource.address
  //     ?.toLowerCase()
  //     .includes(searchQueryLower);
  //   const locationMatch = resource.city
  //     ?.toLowerCase()
  //     .includes(searchQueryLower);

  //   return nameMatch || addressMatch || locationMatch;
  // });

  return (
    <div className="flex flex-col h-full">
      <ResourceCard
        resources={searchFilteredResources}
        onViewDetailsAction={onViewDetailsAction}
        onResourceHover={onResourceHover}
      />
    </div>
  );
};

export default ResourceList;
