/**
 * ProfileCard Component
 * 
 * A client-side component that displays the admin user's profile information.
 * Features:
 * - Displays profile picture using Next.js Image component
 * - Shows admin greeting
 * - Provides logout functionality
 * 
 * @component
 * @example
 * <ProfileCard />
 */

"use client";
import Image from "next/image";
import { useLogout } from "../hooks/useLogout";
import React from "react";

import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Link from "next/link";
import { useUser } from "@/app/context/UserProvider";
export const ProfileCard = () => {
  const { user } = useUser(); // custom session hook
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { handleLogout } = useLogout();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account">
                  <IconButton
                    onClick={handleClick}
                    size="medium"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Image
                      src={user?.image || "/default-avatar.jpg"} // will show image later user.image ||
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
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
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    href="/profile"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={
                        // session?.user?.image ||
                        user?.image || "/default-avatar.jpg"
                      } // will show image later user.image ||
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    Profile
                  </Link>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
    </>
  );
}; 