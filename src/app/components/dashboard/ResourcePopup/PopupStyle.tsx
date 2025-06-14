import { styled, Box, IconButton } from "@mui/material";

export const StyledPopup = styled("div")(({ theme }) => ({
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
  maxWidth: 500, // Increase width for forms
  maxHeight: "80vh", // Increase height for forms
  position: "relative",
  overflow: "hidden",
  marginTop: 2,
}));

export const PopupBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  maxHeight: "calc(80vh - 50px)",
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
export const PopupHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(0.5),
  position: "sticky",
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
  padding: "4px 0",
}));
export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 2,
  top: 2,
  color: theme.palette.grey[500],
  padding: 2,
  "&:hover": {
    color: theme.palette.grey[700],
  },
}));

export const PopupFormContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: "auto",
  maxHeight: "calc(80vh - 100px)",
}));