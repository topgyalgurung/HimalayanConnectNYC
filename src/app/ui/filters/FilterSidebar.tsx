

"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ResourceFilter from "./ResourceFilter";
import BoroughFilter from "./BoroughFilter";
import MobileFilterButton from "./MobileFilterButton";

interface FilterSidebarProps {
  selectedCategories: string[];
  selectedBoroughs: string[];
}

export default function FilterSidebar({
  selectedCategories,
  selectedBoroughs,
}: FilterSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const updateFilters = useCallback(
    (nextCategories: string[], nextBoroughs: string[]) => {
      const params = new URLSearchParams(searchParams);

      if (nextCategories.length > 0) {
        params.set("categories", nextCategories.join(","));
      } else {
        params.delete("categories");
      }

      if (nextBoroughs.length > 0) {
        params.set("boroughs", nextBoroughs.join(","));
      } else {
        params.delete("boroughs");
      }

      params.delete("page");
      const nextQuery = params.toString();
      replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
    },
    [pathname, replace, searchParams]
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:flex flex-col h-full max-h-[calc(100vh-90px)] overflow-hidden">
        <div className="flex-1 text-sm overflow-y-auto px-2 py-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <div className="flex flex-col space-y-4 pb-4">
            {/* Resource name filter */}
            <div className="w-full">
              <ResourceFilter
                selectedCategories={selectedCategories}
                onFilterChangeAction={(nextCategories) =>
                  updateFilters(nextCategories, selectedBoroughs)
                }
              />
            </div>
            <div className="w-full">
              {/* city borough name filter  */}
              <BoroughFilter
                selectedBoroughs={selectedBoroughs}
                onFilterChangeAction={(nextBoroughs) =>
                  updateFilters(selectedCategories, nextBoroughs)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <MobileFilterButton
        selectedCategories={selectedCategories}
        selectedBoroughs={selectedBoroughs}
        onCategoryChange={(nextCategories) =>
          updateFilters(nextCategories, selectedBoroughs)
        }
        onBoroughChange={(nextBoroughs) =>
          updateFilters(selectedCategories, nextBoroughs)
        }
      />
    </>
  );
}


