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
    <div className="p-3 border border-gray-200 rounded-lg shadow-sm bg-white transition-all duration-200 hover:border-gray-300">
      <List sx={{ width: "100%", padding: 0, margin: 0 }} dense>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-700 text-sm tracking-wide">
              CATEGORY
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
            {openResFilter ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </button>
        </div>

        <Collapse in={openResFilter} timeout="auto" unmountOnExit>
          <div className="space-y-1">
            {CATEGORY_FILTERS.map((cat) => (
              <ListItem 
                key={cat.id} 
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
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => handleCategoryCheckboxChange(cat.name)}
                      size="small"
                      sx={{
                        color: '#94a3b8',
                        '&.Mui-checked': {
                          color: '#3b82f6',
                        },
                      }}
                    />
                  </ListItemIcon>
                  <div className="flex items-center gap-2 flex-1">
                    <Image
                      src={cat.icon}
                      alt={cat.name}
                      width={20}
                      height={20}
                      className="opacity-75"
                    />
                    <ListItemText
                      primary={cat.name}
                      primaryTypographyProps={{
                        className: "text-sm font-medium text-gray-700"
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
