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
 * @param {boolean} props.showSubmission - Controls whether to show "Your Submission" text
 *
 * @example
 * <Popup
 *   anchor={anchorElement}
 *   open={isOpen}
 *   onClose={handleClose}
 *   title="Resource Details"
 *   content="Detailed information here"
 *   showSubmission={true}
 * />
 */
"use client";

import React, { ReactNode } from "react";
import { Popover } from "@mui/material";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PopupHeader, PopupBody, StyledPopup,  CloseButton, PopupFormContent } from "./PopupStyle";

interface PopupProps {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  showSubmission?: boolean;
  isForm?: boolean;
  formContent?: ReactNode;
}

export default function Popup({
  anchor,
  open,
  onClose,
  title,
  content,
  formContent,
  isForm = false,
  showSubmission = false,
}: PopupProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <StyledPopup>
        <PopupHeader>
          {showSubmission && (
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Your Submission
            </Typography>
          )}
          <CloseButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </CloseButton>
        </PopupHeader>
        <PopupBody>
          <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary", textAlign: "center", fontWeight: 600, fontSize: "1.2rem" }}>
             {title}
          </Typography>
          {isForm ? (
            <PopupFormContent>{formContent}</PopupFormContent>
          ) : (
            <>
              {content}
            </>
          )}
        </PopupBody>
      </StyledPopup>
    </Popover>
  );
}
