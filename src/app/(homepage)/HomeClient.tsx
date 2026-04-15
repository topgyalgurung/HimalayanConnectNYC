"use client";

import { useEffect, useRef, useState } from "react";
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
  selectedSort: "alphabetical" | "newest" | "oldest";
}

type DragTarget = "filter" | "map" | null;

const MIN_FILTER_WIDTH = 18;
const MAX_FILTER_WIDTH = 32;
const MIN_LIST_WIDTH = 24;
const MIN_MAP_WIDTH = 30;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HomeClient({
  initialResources,
  totalPages,
  selectedCategories,
  selectedBoroughs,
  selectedSort,
}: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [hoveredResourceId, setHoveredResourceId] = useState<string | null>(
    null
  );
  const [isResizableLayout, setIsResizableLayout] = useState(false);
  const [dragTarget, setDragTarget] = useState<DragTarget>(null);
  const [panelWidths, setPanelWidths] = useState({
    filter: 20,
    list: 34,
    map: 46,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateLayoutMode = () => setIsResizableLayout(mediaQuery.matches);

    updateLayoutMode();
    mediaQuery.addEventListener("change", updateLayoutMode);

    return () => {
      mediaQuery.removeEventListener("change", updateLayoutMode);
    };
  }, []);

  useEffect(() => {
    if (!dragTarget || !isResizableLayout) {
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("userSelect");
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const bounds = container.getBoundingClientRect();
      const pointerX = clamp(event.clientX - bounds.left, 0, bounds.width);
      const pointerPercent = (pointerX / bounds.width) * 100;

      setPanelWidths((current) => {
        const currentRightDivider = current.filter + current.list;

        if (dragTarget === "filter") {
          const nextFilter = clamp(
            pointerPercent,
            MIN_FILTER_WIDTH,
            Math.min(MAX_FILTER_WIDTH, currentRightDivider - MIN_LIST_WIDTH)
          );

          return {
            filter: nextFilter,
            list: currentRightDivider - nextFilter,
            map: current.map,
          };
        }

        const nextRightDivider = clamp(
          pointerPercent,
          current.filter + MIN_LIST_WIDTH,
          100 - MIN_MAP_WIDTH
        );

        return {
          filter: current.filter,
          list: nextRightDivider - current.filter,
          map: 100 - nextRightDivider,
        };
      });
    };

    const handleMouseUp = () => {
      setDragTarget(null);
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("userSelect");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragTarget, isResizableLayout]);

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

  const desktopFilterStyle = isResizableLayout
    ? { flexBasis: `${panelWidths.filter}%` }
    : undefined;
  const desktopListStyle = isResizableLayout
    ? { flexBasis: `${panelWidths.list}%` }
    : undefined;
  const desktopMapStyle = isResizableLayout
    ? { flexBasis: `${panelWidths.map}%` }
    : undefined;

  return (
    // render filter sidebar, resource list panel middle, and map view right
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row h-auto text-sm lg:text-sm lg:h-[calc(100vh-90px)] w-full"
    >
      <aside
        style={desktopFilterStyle}
        className="w-full lg:flex-none bg-white shadow-md flex flex-col h-auto lg:h-[calc(100vh-90px)] px-2 md:px-3 lg:px-4"
      >
        <FilterSidebar
          selectedCategories={selectedCategories}
          selectedBoroughs={selectedBoroughs}
        />
      </aside>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize filter and resource list panels"
        onMouseDown={() => setDragTarget("filter")}
        className="hidden lg:flex w-3 cursor-col-resize items-center justify-center bg-transparent"
      >
        <div className="h-24 w-1 rounded-full bg-gray-200 transition-colors hover:bg-blue-400" />
      </div>

      <aside
        style={desktopListStyle}
        className="w-full lg:flex-none pl-0 lg:pl-1 flex flex-col min-h-0 mb-4 lg:mb-0"
      >
        <ResourceListPanel
          filteredResources={initialResources}
          selectedSort={selectedSort}
          onViewDetailsAction={handleViewDetails}
          onResourceHover={setHoveredResourceId}
        />
        <div className="flex justify-center mb-3">
          <Pagination totalPages={totalPages} />
        </div>
      </aside>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize resource list and map panels"
        onMouseDown={() => setDragTarget("map")}
        className="hidden lg:flex w-3 cursor-col-resize items-center justify-center bg-transparent"
      >
        <div className="h-24 w-1 rounded-full bg-gray-200 transition-colors hover:bg-blue-400" />
      </div>

      <aside
        style={desktopMapStyle}
        className="w-full lg:flex-1 bg-white shadow-md flex flex-col h-[500px] lg:h-full border-2 border-gray-300"
      >
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
