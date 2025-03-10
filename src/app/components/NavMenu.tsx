"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";

export default function NavMenu() {
  const pathname = usePathname();
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
        <div className="flex-grow max-w-xl">
          <SearchInput />
        </div>

        {/* add resource  */}
        <ul className="flex flex-1 items-center justify-end gap-8 ml-4">
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

          <Link
            href="/login"
            className={`flex-nowrap cursor-pointer ${
              pathname === "/login"
                ? "text-white bg-blue-500 hover:bg-blue-600"
                : "font-bold"
            } mr-4 font-medium rounded-lg text-sm bg-gray-200  px-5 py-2`}
          >
            Login / Sign up
          </Link>
        </ul>
      </nav>
    </header>
  );
}
