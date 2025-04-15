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
    <div className="p-1 border rounded-md text-black mt-2">
      <div className="flex items-center mb-1 justify-center">
        <h3 className="font-bold mb-2 mr-3">Category</h3>
        <span className="mx-2 border-l border-gray-300 h-6 ml-4" />
        <button onClick={clearFilters} className="ml-2 text-black-900">
          &times;
        </button>
      </div>
      <hr className="border-t border-gray-300 w-full mb-3" />

      <div className="flex flex-col ml-10 space-x-0 ">
        <List
          sx={{ width: "100%", maxWidth: 150, bgColor: "background.paper" }}
        >
          {categories.map((cat) => (
            <ListItem key={cat.id} className="flex items-center space-x-2 p-0">
              <ListItemButton role={undefined}>
                <ListItemIcon>
                  <Checkbox
                    type="checkbox"
                    value={cat.name}
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => handleCategoryCheckboxChange(cat.name)}
                    className="mr-2 w-4 h-2"
                  />
                </ListItemIcon>
                <ListItemText className="capitalize" primary={cat.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
