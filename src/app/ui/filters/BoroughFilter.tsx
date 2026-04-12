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
import { BOROUGH_FILTERS } from "@/app/lib/resources/filterOptions";

interface BoroughFilterProps {
  onFilterChangeAction: (boroughs: string[]) => void; // Function to handle filter change
  selectedBoroughs?: string[]; // Optional array of selected boroughs
}

export default function BoroughFilter({
  onFilterChangeAction,
  selectedBoroughs = [],
}: BoroughFilterProps) {
  const [open, setOpen] = useState(true); // default: expanded
  const hasActiveFilters = selectedBoroughs.length > 0;

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
    <div className="rounded-lg border border-gray-200 bg-white px-2 py-2 shadow-sm">
      <List sx={{ width: "100%", padding: 0, margin: 0 }} dense>
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="text-xs font-semibold tracking-[0.16em] text-gray-700">
              BOROUGH
            </h3>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 transition-colors duration-200 hover:text-red-500"
              >
                Clear
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/399/399274.png"
                  alt="clear"
                  width={12}
                  height={12}
                  className="opacity-70"
                />
              </button>
            ) : null}
          </div>
          <button
            onClick={handleToggle}
            className="rounded-full p-1 text-gray-400 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-600"
          >
            {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </button>
        </div>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="space-y-0.5">
            {BOROUGH_FILTERS.map((borough) => (
              <ListItem 
                key={borough.id} 
                disablePadding 
                sx={{ 
                  margin: 0,
                  borderRadius: "0.5rem",
                  "&:hover": { backgroundColor: "#f9fafb" },
                }}
              >
                <ListItemButton 
                  className="min-h-[34px] rounded-md px-1.5 py-0.5 transition-colors duration-200"
                  sx={{ minHeight: 34 }}
                >
                  <ListItemIcon className="mr-1.5 min-w-0">
                    <Checkbox
                      checked={selectedBoroughs.includes(borough.name)}
                      onChange={() => handleBoroughCheckboxChange(borough.name)}
                      size="small"
                      sx={{
                        padding: "4px",
                        color: "#9ca3af",
                        "&.Mui-checked": {
                          color: "#2563eb",
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={borough.name}
                    primaryTypographyProps={{
                      className: "text-[13px] font-medium text-gray-700"
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
