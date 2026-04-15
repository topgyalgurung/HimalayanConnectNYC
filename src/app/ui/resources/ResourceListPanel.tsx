// src/app/(homepage)/resources/ResourceListPanel.tsx
/**
 * resource list panel for the homepage of the Himalayan Connect NYC application.
 * It displays the list of resources in a sidebar.
 *
 */

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ResourceList from "./ResourceList";
import type { Resource } from "@/app/lib/types";

import dynamic from "next/dynamic";

interface ResourceListPanelProps {
  filteredResources: Resource[];
  selectedSort: "alphabetical" | "newest" | "oldest";
  onViewDetailsAction: (resource: Resource) => void;
  onResourceHover?: (resourceId: string | null) => void;
}
const SearchInput = dynamic(() => import("@/app/ui/SearchInput"), {
  ssr: false,
});

export default function ResourceListPanel({
  filteredResources,
  selectedSort,
  onViewDetailsAction,
  onResourceHover,
}: ResourceListPanelProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortChange = (sort: "alphabetical" | "newest" | "oldest") => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <h2 className="text-lg text-center font-bold text-black mb-2 top-0 z-10 p-2 shadow bg-white">
        RESOURCES
      </h2>
      <div className="mb-3 flex items-center gap-2">
        <SearchInput placeholder="Search resources ..." />
        <select
          aria-label="Sort resources"
          value={selectedSort}
          onChange={(e) =>
            handleSortChange(
              e.target.value as "alphabetical" | "newest" | "oldest"
            )
          }
          className="min-w-[145px] rounded-md border border-gray-200 bg-white px-3 py-[9px] text-sm text-gray-700 outline-2"
        >
          <option value="alphabetical">A-Z</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto mb-4">
        <ResourceList
          filteredResources={filteredResources}
          onViewDetailsAction={onViewDetailsAction}
          onResourceHover={onResourceHover}
        />
      </main>
    </>
  );
}
