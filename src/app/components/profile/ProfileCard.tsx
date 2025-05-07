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
import { useLogout } from "../../hooks/useLogout";

export const ProfileCard = () => {
  const { handleLogout } = useLogout();

  return (
    <div className="w-full md:w-1/3 p-4">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={"/default-avatar.jpg"}
            alt="Profile Picture"
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>
        <h2 className="text-xl font-bold mb-4">Hello Admin</h2>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-500 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}; 