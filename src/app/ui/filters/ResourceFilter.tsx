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
import { CATEGORY_FILTERS } from "@/app/lib/resources/filterOptions";

interface CategoryFilterProps {
  onFilterChangeAction: (category: string[]) => void;
  selectedCategories?: string[];
}

export default function ResourceFilter({
  onFilterChangeAction,
  selectedCategories = [],
}: CategoryFilterProps) {
  const [openResFilter, setOpenResFilter] = useState(true); // default: expanded
  const hasActiveFilters = selectedCategories.length > 0;

  const handleCategoryCheckboxChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category
      )
      : [...selectedCategories, category];

    onFilterChangeAction(updatedCategories);
  };

  const clearFilters = () => {
    onFilterChangeAction([]);
  };

  const handleToggle = () => {
    setOpenResFilter((prev) => !prev);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-2 py-2 shadow-sm">
      <List sx={{ width: "100%", padding: 0, margin: 0 }} dense>
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="text-xs font-semibold tracking-[0.16em] text-gray-700">
              CATEGORY
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
            {openResFilter ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </button>
        </div>

        <Collapse in={openResFilter} timeout="auto" unmountOnExit>
          <div className="space-y-0.5">
            {CATEGORY_FILTERS.map((cat) => (
              <ListItem 
                key={cat.id} 
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
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => handleCategoryCheckboxChange(cat.name)}
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
                  <div className="flex flex-1 items-center gap-2">
                    <Image
                      src={cat.icon}
                      alt={cat.label}
                      width={16}
                      height={16}
                      className="opacity-75"
                    />
                    <ListItemText
                      primary={cat.label}
                      primaryTypographyProps={{
                        className: "text-[13px] font-medium text-gray-700"
                      }}
                    />
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
          </div>
        </Collapse>
      </List>
    </div>
  );
}
