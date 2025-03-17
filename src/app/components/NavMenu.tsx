"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
// import { logout } from "../actions/auth";

export default function NavMenu() {
  const pathname = usePathname();
  // const router = useRouter();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //   } catch (error) {
  //     console.error("logout failed", error);
  //   }
  // };

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
        <div className="flex-grow flex justify-center">
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
                : "font-bold text-lg text-black-500"
            } font-medium rounded-lg text-sm px-5 py-2`}
          >
            Add Resource ➕
          </Link>
          {/* {user ? ( */}
          {/* <button
              onClick={handleLogout}
              className="px-4 py-2 text-red rounded-lg transition-colors flex items-center"
            >
              Logout{" "}
            </button>
          ) : ( */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Login / Sign Up
            </Link>
          </div>
          {/* )} */}
        </div>
      </nav>
    </header>
  );
}
