"use client";

import { useState } from 'react';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import ResourceFilter from './ResourceFilter';
import BoroughFilter from './BoroughFilter';

interface MobileFilterButtonProps {
  selectedCategories: string[];
  selectedBoroughs: string[];
  onCategoryChange: (categories: string[]) => void;
  onBoroughChange: (boroughs: string[]) => void;
}

export default function MobileFilterButton({
  selectedCategories,
  selectedBoroughs,
  onCategoryChange,
  onBoroughChange
}: MobileFilterButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<FilterAltIcon />}
          sx={{
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#2563eb',
            },
          }}
        >
          Filters
        </Button>
      </div>

      {/* Filter Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        sx={{
          '& .MuiDialog-paper': {
            margin: 0,
            width: '100%',
            maxHeight: '100%',
          },
        }}
      >
        <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Filters</h2>
          <IconButton onClick={handleClose} edge="end">
            <CloseIcon />
          </IconButton>
        </div>
        
        <DialogContent sx={{ padding: 2 }}>
          <div className="space-y-4">
            <ResourceFilter
              selectedCategories={selectedCategories}
              onFilterChangeAction={onCategoryChange}
            />
            <BoroughFilter
              selectedBoroughs={selectedBoroughs}
              onFilterChangeAction={onBoroughChange}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
