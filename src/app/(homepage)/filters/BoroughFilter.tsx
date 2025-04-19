"use client";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

interface BoroughFilterProps {
  onFilterChangeAction: (boroughs: string[]) => void; // Function to handle filter change
  selectedBoroughs?: string[]; // Optional array of selected boroughs
}

// Define the list of boroughs
const boroughs = [
  { id: 1, name: "Manhattan" },
  { id: 2, name: "Brooklyn" },
  { id: 3, name: "Queens" },
  { id: 4, name: "Bronx" },
  { id: 5, name: "Staten Island" },
];

export default function BoroughFilter({
  onFilterChange,
  selectedBoroughs = [],
}: BoroughFilterProps) {
  // Function to handle borough checkbox change

  const handleBoroughCheckboxChange = (borough: string) => {
    // If the selected boroughs already include the current borough,
    // we filter it out. Otherwise, we add it to the selected boroughs.
    const updatedBoroughs = selectedBoroughs.includes(borough)
      ? selectedBoroughs.filter((b) => b !== borough)
      : [...selectedBoroughs, borough];

    onFilterChange(updatedBoroughs);
  };

  // Function to clear all filters
  const clearFilters = () => {
    onFilterChange([]);
  };

  // Render the BoroughFilter component
  return (
    <div className="p-1 border rounded-md text-black text-sm mt-2">
      <div className="flex items-center justify-center mb-1">
        <h3 className="font-semibold text-sm">NYC Borough</h3>
        <span className="mx-2 border-l border-gray-300 h-6 ml-4" />
        <button onClick={clearFilters} className="text-gray-500">
          Clear ×
        </button>
      </div>
      <hr className="mb-2" />
      <List dense sx={{ width: "100%", maxWidth: 140 }}>
        {boroughs.map((borough) => (
          <ListItem key={borough.id} disablePadding>
            <ListItemButton>
              <ListItemIcon className="min-w-0 mr-2">
                <Checkbox
                  checked={selectedBoroughs.includes(borough.name)}
                  onChange={() => handleBoroughCheckboxChange(borough.name)}
                  size="small"
                />
              </ListItemIcon>
              <ListItemText className="capitalize" primary={borough.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
