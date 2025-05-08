/**
 * SharedProfileCard Component
 * 
 * A reusable client-side component that displays user profile information.
 * Can be used by both admin and user dashboards.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.userName - Name to display in greeting
 * @param {Function} props.onLogout - Logout handler function
 * @param {string} props.userType - Type of user ("admin" or "user")
 * 
 * @example
 * <SharedProfileCard 
 *   userName="John Doe"
 *   onLogout={handleLogout}
 *   userType="user"
 * />
 */
"use client";
import Image from "next/image";

interface SharedProfileCardProps {
  userName: string;
  onLogout: () => void;
  userType: "admin" | "user";
}

export const ProfileCard = ({ userName, onLogout, userType }: SharedProfileCardProps) => {
  return (
    <div className="w-full md:w-1/3 p-4">
      <h1 className="text-4xl font-bold text-center mt-1">Profile</h1>
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
        <h2 className="text-xl font-bold mb-4">
          Hello {userType === "admin" ? "Admin" : `User: ${userName}`}
        </h2>
        <div className="mt-6">
          <button
            onClick={onLogout}
            className="px-4 py-2 text-red-500 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}; 