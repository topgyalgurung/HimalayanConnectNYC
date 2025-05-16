/**
 * UserProfileMenu Component
 *
 * This component is the user profile menu for the homepage of the Himalayan Connect NYC application.
 * It allows the user to login, sign up, and logout.
 *
 * @returns {JSX.Element} The user profile (with dashboard) menu component
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useUser } from "@/app/context/UserProvider";
import { useLogout } from "@/app/hooks/useLogout";

export default function UserProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useUser();
  const { handleLogout } = useLogout();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center gap-4">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{
              ml: 2,
              padding: 0,
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Image
              src={user?.image || "/user.png"} // for future when image feature
              alt="User Avatar"
              width={56}
              height={56}
              className="rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: "200px",
              borderRadius: "12px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        {/* Link outside of menu mores smoother now  */}
        <Link
          href="/profile"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              padding: "12px 16px",
              "&:hover": {
                backgroundColor: "rgba(59, 130, 246, 0.08)",
              },
            }}
          >
            {/* <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity"> */}
            <Image
              src={user?.image || "/user.png"}
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">Profile</span>
              <span className="text-sm text-gray-500">View your profile</span>
            </div>
            {/* </Link> */}
          </MenuItem>
        </Link>

        <Divider sx={{ my: 1 }} />
        {/* logout button */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            padding: "12px 16px",
            color: "#EF4444",
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.08)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <Logout fontSize="small" sx={{ color: "#EF4444" }} />
          </ListItemIcon>
          <span className="font-medium">Logout</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
