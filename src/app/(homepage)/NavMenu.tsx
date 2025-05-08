"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import SearchInput from "../components/ui/SearchInput";
import { useUser } from "@/app/context/UserProvider";
import { useLogout } from "../hooks/useLogout";

import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

// import { Button } from "@mui/material"; to be used for Add Resource, note: currently gets frozen when called add resource if material ui button
// import { deleteSession } from "@/app/lib/session";

export default function NavMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const pathname = usePathname();

  const { user } = useUser(); // custom session hook
  const { handleLogout } = useLogout();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      {/* <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters> */}
      <nav className="flex items-center justify-between p-2 bg-white shadow-md flex-wrap border-b-1 w-full">
        {/* Logo */}

        <Link
          href="/"
          className={`font-bold mr-4 ${
            pathname === "/" ? "text-blue-500" : ""
          }`}
        >
          <Image
            src="/logo.png"
            alt="Himalayan Connect Logo"
            width={200}
            height={50}
            className="ml-10 w-[100px] h-auto max-w-full object-contain"
          />
        </Link>

        {/* Search input  */}

        <div className="ml-24 flex-grow flex justify-center">
          <div className="flex-grow max-w-xl">
            <SearchInput />
          </div>
        </div>

        {/* add resource  */}

        <button
          variant="contained"
          className="flex flex-1 items-center justify-end gap-4 ml-4 capitalize"
        >
          <Link
            href="/resources/add"
            className={`flex items-center text-blue-500 px-1 py-1 rounded-lg text-sm font-semibold transition-all 
          ${pathname === "/add-resource" ? "text-blue-500" : "text-blue"}
        `}
          >
            Add Resource ➕
          </Link>
        </button>

        {/* material UI profile on click show  button to go profile or logout */}
        <div className="flex flex-1 items-center justify-end gap-8 ml-4">
          {user ? (
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
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login / Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
