/**
 * Filter Section Server Component
 * 
 * Server component wrapper for FilterSidebar.
 * Currently FilterSidebar handles its own data fetching,
 * but this provides a structure for future server-side filter data.
 */

import FilterSidebar from "../filters/FilterSidebar";
import type { Resource } from "@/app/lib/types";

interface FilterSectionProps {
  initialResources: Resource[];
  onFilterChangeAction: (resources: Resource[]) => void;
}

export default function FilterSection({ 
  initialResources, 
  onFilterChangeAction 
}: FilterSectionProps) {
  return (
    <FilterSidebar
      resources={initialResources}
      onFilterChangeAction={onFilterChangeAction}
    />
  );
} 