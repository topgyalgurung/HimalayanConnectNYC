/**
 * resource list for the homepage of the Himalayan Connect NYC application.
 * It displays the list of resources in a sidebar.
 *
 */

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ResourceCard from "./ResourceCard";
import type { Resource } from "@/app/lib/types";

interface ResourceListProps {
  query?: string;
  page?: number;
  filteredResources: Resource[];
  onViewDetailsAction: (resource: Resource) => void;
  onResourceHover?: (resourceId: string | null) => void;
}

const ResourceList = ({
  query,
  filteredResources,
  onViewDetailsAction,
  onResourceHover,
}: ResourceListProps) => {
  const pathname = usePathname();

  const searchQuery = (query ?? "").trim();
  const searchQueryLower = searchQuery.toLowerCase();

  const searchFilteredResources = searchQuery
    ? filteredResources.filter((resource) => {
        const nameMatch = resource.name?.toLowerCase().includes(searchQueryLower);
        const addressMatch = resource.address
          ?.toLowerCase()
          .includes(searchQueryLower);
        const cityMatch = resource.city
          ?.toLowerCase()
          .includes(searchQueryLower);
        const descriptionMatch = resource.description
          ?.toLowerCase()
          .includes(searchQueryLower);

        return nameMatch || addressMatch || cityMatch || descriptionMatch;
      })
    : filteredResources;

  if (searchFilteredResources.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center py-12 px-4 text-center">
        <p className="text-gray-600 mb-4">
          No resources match your filters. Try adjusting your search or filters.
        </p>
        <Link
          href={pathname}
          className="text-blue-600 hover:text-blue-700 font-medium underline"
        >
          Clear search and filters
        </Link>
      </div>
    );
  }

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
