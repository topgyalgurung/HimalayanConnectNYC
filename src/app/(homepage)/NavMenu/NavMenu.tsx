/**
 * NavMenu Component
 *
 * The main navigation menu component that provides:
 * - Logo and branding
 * - Search functionality
 * - User authentication state
 * - Profile menu with user actions
 * - Login/Signup buttons for unauthenticated users
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import SearchInput from "./SearchInput/SearchInput";
import UserProfileMenu from "../ProfileCard/UserProfileMenu";
import { useUser } from "@/app/context/UserProvider";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";

const SearchInput = dynamic(() => import("./SearchInput/SearchInput"), {
  ssr: false,
});

export default function NavMenu() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header>
      <nav className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 bg-white shadow-md flex-wrap border-b-1 w-full">
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
        <div className="ml-0 md:ml-24 flex-grow flex justify-center">
          <div className="w-full md:w-grow md:max-w-xl">
            <SearchInput />
          </div>
        </div>

        {/* add resource  */}
        <Link
          href="/resources/add"
          className={`flex items-center text-blue-500 px-1 py-1 rounded-lg text-sm font-semibold transition-all 
          ${pathname === "/add-resource" ? "text-blue-500" : "text-blue"}
        `}
        >
          <Button
            variant="contained"
            color="primary"
            // optional: adds margin-left for spacing
          >
            Add Resource ➕
          </Button>
        </Link>

        {/* User profile menu */}
        <div className="flex flex-1 items-center justify-end gap-8 ml-4">
          {user ? (
            <UserProfileMenu />
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all text-sm font-medium shadow-sm hover:shadow-md"
              >
                Login / Sign Up
              </Link>
            </div>
          )}
          {/* <UserProfileMenu /> */}
        </div>
      </nav>
    </header>
  );
}
