"use client";


import { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

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
  onFilterChangeAction,
  selectedBoroughs = [],
}: BoroughFilterProps) {
  const [open, setOpen] = useState(true); // default: expanded
  // Function to handle borough checkbox change
  const handleBoroughCheckboxChange = (borough: string) => {
    // If the selected boroughs already include the current borough,
    // we filter it out. Otherwise, we add it to the selected boroughs.
    const updatedBoroughs = selectedBoroughs.includes(borough)
      ? selectedBoroughs.filter((b) => b !== borough)
      : [...selectedBoroughs, borough];

    onFilterChangeAction(updatedBoroughs);
  };

  // Function to clear all filters
  const clearFilters = () => {
    onFilterChangeAction([]);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };


  // Render the BoroughFilter component
  return (
    <div className="p-3 pr-4 border-2 rounded-md text-black text-sm">
      <List sx={{ width: "100%", padding: 0, margin: 0 }} dense>
        <div className="flex items-center justify-center mb-1 flex-wrap sm:flex-nowrap">
          <h3 className="font-semibold text-blue-500 text-sm whitespace-nowrap">
            BOROUGH
          </h3>
          <span className="mx-2 border-l border-gray-300 h-6 ml-4 hidden sm:block" />
          <button onClick={clearFilters} className="text-red-500 ml-auto sm:ml-0 flex items-center gap-2">
            CLEAR
            <Image src="https://cdn-icons-png.flaticon.com/512/399/399274.png" alt="clear" width={20} height={20} />
          </button>
          <ListItemButton onClick={handleToggle}>
            <ListItemText />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

        </div>
        <hr className="mb-2" />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense sx={{ width: "100%", padding: 0, margin: 0 }}>
            {boroughs.map((borough) => (
              <ListItem key={borough.id} disablePadding sx={{ margin: 0 }}>
                <ListItemButton className="py-0.2 px-2">
                  <ListItemIcon className="min-w-0 mr-2">
                    <Checkbox
                      checked={selectedBoroughs.includes(borough.name)}
                      onChange={() => handleBoroughCheckboxChange(borough.name)}
                      size="small"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={borough.name}
                    className="capitalize text-xs sm:text-sm"
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}
