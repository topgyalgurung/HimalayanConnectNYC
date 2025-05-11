/**
 * Popup Component
 * 
 * A reusable popup component built with Material-UI.
 * Displays content in a floating window with a close button.
 * 
 * @component
 * @param {Object} props
 * @param {HTMLElement|null} props.anchor - Element to anchor the popup to
 * @param {boolean} props.open - Controls popup visibility
 * @param {Function} props.onClose - Handler for closing the popup
 * @param {string} props.title - Popup title
 * @param {ReactNode} props.content - Popup content
 * 
 * @example
 * <Popup
 *   anchor={anchorElement}
 *   open={isOpen}
 *   onClose={handleClose}
 *   title="Resource Details"
 *   content="Detailed information here"
 * />
 */
"use client";

import React, { ReactNode } from "react";
import { Popover } from "@mui/material";
import { styled, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledPopup = styled("div")(({ theme }) => ({
  zIndex: 1500,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 2px 16px 0 rgba(0,0,0,0.8)"
      : "0 2px 16px 0 rgba(0,0,0,0.12)",
  background:
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff",
  borderRadius: 8,
  padding: "8px 12px",
  minWidth: 280,
  maxWidth: 360,
  maxHeight: "65vh",
  position: "relative",
  overflow: "hidden",
  marginTop: 2,
}));

const PopupBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  maxHeight: "calc(65vh - 50px)",
  overflowY: "auto",
  paddingRight: 2,
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "2px",
    "&:hover": {
      background: "#555",
    },
  },
}));

const PopupHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(0.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "sticky",
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
  padding: "4px 0",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 2,
  top: 2,
  color: theme.palette.grey[500],
  padding: 2,
  "&:hover": {
    color: theme.palette.grey[700],
  },
}));

interface PopupProps {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

export default function Popup({
  anchor,
  open,
  onClose,
  title,
  content,
}: PopupProps) {
  return (
    <Popover 
      open={open} 
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <StyledPopup>
        <PopupHeader>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Your Submission</Typography>
          <CloseButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </CloseButton>
        </PopupHeader>
        <PopupBody>
          <Typography variant="body2" sx={{ mb: 0.5, color: 'text.secondary' }}>Name: {title}</Typography>
          {content}
        </PopupBody>
      </StyledPopup>
    </Popover>
  );
}
