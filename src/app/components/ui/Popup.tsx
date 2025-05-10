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
 * @param {string} props.content - Popup content
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

import React from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
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
  padding: "16px 24px",
  minWidth: 320,
  maxWidth: 400,
  position: "relative",
}));

const PopupBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[700],
  },
}));

type CustomPopupProps = {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
};

export default function Popup({
  anchor,
  open,
  onClose,
  title,
  content,
}: CustomPopupProps) {
  return (
    <BasePopup 
      open={open} 
      anchor={anchor}
      placement="bottom-start"
      offset={4}
    >
      <StyledPopup>
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>
        <PopupBody>
          <Typography variant="h6">{title}</Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>{content}</Typography>
        </PopupBody>
      </StyledPopup>
    </BasePopup>
  );
}
