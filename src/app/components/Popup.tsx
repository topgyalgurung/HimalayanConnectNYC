"use client";

import React from "react";
import {
  Unstable_Popup as BasePopup,
  type PopupProps as BasePopupProps,
} from "@mui/base/Unstable_Popup";
import { styled, Box, Typography } from "@mui/material";

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
}));

const PopupBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
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
    <BasePopup open={open} anchor={anchor} onClose={onClose}>
      <StyledPopup>
        <PopupBody>
          <Typography variant="h6">{title}</Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>{content}</Typography>
        </PopupBody>
      </StyledPopup>
    </BasePopup>
  );
}
