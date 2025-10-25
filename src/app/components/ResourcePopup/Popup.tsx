/**
 * Popup Component
 *
 * A reusable popup component built with Material-UI.
 * Displays content in a floating window with a close button.
 *
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
