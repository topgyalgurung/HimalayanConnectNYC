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

// Add icon URLs for each category
const categories = [
  {
    id: 1,
    name: "community",
    icon: "https://cdn-icons-png.flaticon.com/512/7829/7829198.png",
  },
  {
    id: 2,
    name: "legal",
    icon: "https://cdn-icons-png.flaticon.com/512/4052/4052204.png",
  },
  {
    id: 3,
    name: "health",
    icon: "https://cdn-icons-png.flaticon.com/512/2382/2382533.png",
  },
  {
    id: 4,
    name: "education",
    icon: "https://cdn-icons-png.flaticon.com/512/4406/4406319.png",
  },
  {
    id: 5,
    name: "finance",
    icon: "https://cdn-icons-png.flaticon.com/512/4256/4256900.png",
  },
  {
    id: 6,
    name: "real estate",
    icon: "https://cdn-icons-png.flaticon.com/512/2238/2238337.png",
  },
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
                  size="small"
                />
              </ListItemIcon>
              <img src={cat.icon} alt={cat.name} className="w-4 h-4 mr-2" />
              <ListItemText primary={cat.name} className="capitalize" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
