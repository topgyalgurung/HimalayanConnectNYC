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
    <div className="p-3 border border-gray-200 rounded-lg shadow-sm bg-white transition-all duration-200 hover:border-gray-300">
      <List sx={{ width: "100%", padding: 0, margin: 0 }} dense>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-700 text-sm tracking-wide">
              BOROUGH
            </h3>
            <span className="h-4 w-px bg-gray-200 mx-2" />
            <button 
              onClick={clearFilters} 
              className="text-red-500 text-xs hover:text-red-600 transition-colors duration-200 flex items-center gap-1"
            >
              CLEAR
              <Image 
                src="https://cdn-icons-png.flaticon.com/512/399/399274.png" 
                alt="clear" 
                width={16} 
                height={16} 
                className="opacity-75"
              />
            </button>
          </div>
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-gray-50 rounded-full transition-colors duration-200"
          >
            {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </button>
        </div>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="space-y-1">
            {boroughs.map((borough) => (
              <ListItem 
                key={borough.id} 
                disablePadding 
                sx={{ 
                  margin: 0,
                  borderRadius: '0.375rem',
                  '&:hover': { backgroundColor: '#f8fafc' }
                }}
              >
                <ListItemButton 
                  className="py-1 px-2 rounded-md transition-colors duration-200"
                >
                  <ListItemIcon className="min-w-0 mr-2">
                    <Checkbox
                      checked={selectedBoroughs.includes(borough.name)}
                      onChange={() => handleBoroughCheckboxChange(borough.name)}
                      size="small"
                      sx={{
                        color: '#94a3b8',
                        '&.Mui-checked': {
                          color: '#3b82f6',
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={borough.name}
                    primaryTypographyProps={{
                      className: "text-sm font-medium text-gray-700 capitalize"
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </div>
        </Collapse>
      </List>
    </div>
  );
}
