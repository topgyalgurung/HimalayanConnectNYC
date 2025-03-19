"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import { useState } from "react";
import { useUser } from "../context/UserProvider";
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser();
  // const [loading, setLoading] = useState(true); // track loading state

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // Clear user state

      router.refresh(); // Rerender menu
      router.push("/"); // Redirect to home
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header>
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
        <div className="flex flex-1 items-center justify-end gap-8 ml-4">
          <Link
            href="/resources/add"
            className={`flex-nowrap cursor-pointer ${
              pathname === "/add-resource"
                ? "text-white bg-blue-500 hover:bg-blue-600"
                : "font-bold bg-orange-500 hover:bg-orange-600 text-lg text-white"
            } font-medium rounded-lg text-sm px-5 py-2`}
          >
            Add Resource ➕
          </Link>
        </div>
        {/* Conditional UI based on authentication status */}
        <div className="flex flex-1 items-center justify-end gap-8 ml-4">
          {/* {loading ? (
            <p> Loading... </p>
          ) : */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* Profile Image */}
              <Link
                href="/profile"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src={"/default-avatar.jpg"} // will show image later user.image ||
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
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
