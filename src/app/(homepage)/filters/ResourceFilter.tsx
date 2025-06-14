"use client";

/**
 * ResourceFilter Component
 * A component that allows users to filter resources by category
 * Uses Material-UI components for styling and functionality
 */

import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";

interface CategoryFilterProps {
  onFilterChangeAction: (category: string[]) => void;
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
  {
    id: 7,
    name: "other",
    icon: "https://cdn-icons-png.flaticon.com/512/3195/3195457.png",
  },
];

export default function ResourceFilter({
  onFilterChangeAction,
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

    onFilterChangeAction(updatedCategories);
  };

  const clearFilters = () => {
    onFilterChangeAction([]);
  };

  return (
    <div className="p-3 pr-4 border-2 rounded-md text-black text-sm">
      <div className="flex items-center justify-center mb-1">
        <h3 className="font-semibold text-blue-500 text-sm">CATEGORY</h3>
        <span className="mx-2 border-l border-gray-300 h-6 ml-4 hidden sm:block" />
        <button onClick={clearFilters} className="text-red-500 ml-auto sm:ml-0 flex items-center gap-2">
          CLEAR 
          <Image src="https://cdn-icons-png.flaticon.com/512/399/399274.png" alt="clear" width={20} height={20} />
        </button>
      </div>
      <hr className="mb-1" />

      <List dense sx={{ width: "100%", padding: 0, margin: 0 }}>
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
              <Image
                src={cat.icon}
                alt={cat.name}
                className="mr-2"
                width={25}
                height={25}
              />
              <ListItemText primary={cat.name} className="capitalize" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
