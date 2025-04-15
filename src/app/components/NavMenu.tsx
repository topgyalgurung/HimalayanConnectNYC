"use client";

import * as React from "react";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import { useUser } from "../context/UserProvider";
// import { logout } from "../actions/auth";
// import { useSession } from "next-auth/react";
// import { signOut } from "next-auth/react";

// import { Button } from "@mui/material"; to be used for Add Resource, note: currently gets frozen when called add resource if material ui button
import { deleteSession } from "../lib/session";

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser(); // custom session hook
  // const { data: session } = useSession();
  // const [loading, setLoading] = useState(true); // track loading state

  // Logout handler
  const handleLogout = async () => {
    try {
      // await logout();
      await deleteSession(); // delete secure cookie
      setUser(null); // Clear user state

      router.refresh(); // Rerender menu
      router.push("/"); // Redirect to home
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // signout handler google auth

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

        {/* Conditional UI based on authentication status */}

        <div className="flex flex-1 items-center justify-end gap-8 ml-4">
          {/* {status === loading ? (
            <p> Loading... </p>
          ) : */}
          {user ? (
            // || session?.user ? (
            <div className="flex items-center gap-4">
              {/* Profile Image */}
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
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                // () => session?.user ? signOut({ callbackUrl: "/" }) : handleLogout()}
                className="px-4 py-2 text-white bg-red-500 rounded-lg transition-colors hover:bg-red-600"
              >
                Logout
              </button>
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
