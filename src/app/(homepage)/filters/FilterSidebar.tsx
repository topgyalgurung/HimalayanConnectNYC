// src/app/(homepage)/filters/FilterSidebar.tsx

"use client";

import { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import ResourceFilter from "./ResourceFilter";
import BoroughFilter from "./BoroughFilter";

interface FilterSidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedBoroughs: string[];
  setSelectedBoroughs: (boroughs: string[]) => void;
}

export default function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedBoroughs,
  setSelectedBoroughs,
}: FilterSidebarProps) {
  const handleBoroughChange = (borough: string) => {
    setSelectedBoroughs((prev) => {
      if (prev.includes(borough)) {
        return prev.filter((b) => b !== borough);
      } else {
        return [...prev, borough];
      }
    });
  };

  return (
    <aside className="w-full md:w-[18%] pl-4 bg-white shadow-md flex flex-col overflow-hidden max-h-screen">
      <h2 className="text-lg text-center font-bold text-black mb-2 sticky top-0 z-10 p-2 shadow bg-white">
        FILTERS
      </h2>
      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        <ResourceFilter
          selectedCategories={selectedCategories}
          onFilterChangeAction={setSelectedCategories}
        />
        <BoroughFilter
          selectedBoroughs={selectedBoroughs}
          onFilterChangeAction={setSelectedBoroughs}
        />
      </div>
    </aside>
  );
}
