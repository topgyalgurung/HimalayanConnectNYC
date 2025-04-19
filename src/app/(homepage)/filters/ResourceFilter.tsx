"use client";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
interface CategoryFilterProps {
  onFilterChange: (category: string[]) => void;
  selectedCategories?: string[];
}

const categories = [
  { id: 1, name: "community" },
  { id: 2, name: "legal" },
  { id: 3, name: "health" },
  { id: 4, name: "education" },
  { id: 5, name: "finance" },
  { id: 6, name: "real estate" },
];

export default function ResourceFilter({
  onFilterChange,
  selectedCategories = [],
}: CategoryFilterProps) {
  const handleCategoryCheckboxChange = (category: string) => {
    //  checks if the selectedCategories array includes the category
    const updatedCategories = selectedCategories.includes(
      category.toLowerCase()
    )
      ? selectedCategories.filter(
          //filtering out the unchecked category
          (c) => c.toLowerCase() !== category.toLowerCase()
        )
      : [...selectedCategories, category];

    onFilterChange(updatedCategories);
  };
  const clearFilters = () => {
    onFilterChange([]);
  };
  return (
    <div className="p-2 border rounded-md text-black text-sm">
      <div className="flex items-center justify-center mb-1">
        <h3 className="font-semibold text-sm">Category</h3>
        <span className="mx-2 border-l border-gray-300 h-6 ml-4" />
        <button onClick={clearFilters} className="text-gray-500">
          Clear ×
        </button>
      </div>
      <hr className="mb-2" />

      <List dense sx={{ width: "100%", maxWidth: 140 }}>
        {categories.map((cat) => (
          <ListItem key={cat.id} disablePadding>
            <ListItemButton>
              <ListItemIcon className="min-w-0 mr-2">
                <Checkbox
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => handleCategoryCheckboxChange(cat.name)}
                />
              </ListItemIcon>
              <ListItemText primary={cat.name} className="capitalize" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
