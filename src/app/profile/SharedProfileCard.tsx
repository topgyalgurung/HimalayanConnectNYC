/**
 * SharedProfileCard Component
 *
 * A reusable client-side component that displays user profile information.
 * Can be used by both admin and user dashboards.
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
  onLogoutAction: () => void;
  userType: "admin" | "user";
}

export const ProfileCard = ({
  userName,
  onLogoutAction,
  userType,
}: SharedProfileCardProps) => {
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="w-full md:w-1/3 p-4">
      <h1 className="text-4xl font-bold text-center mt-1">Profile</h1>

      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={"/user.png"}
            alt="Profile Picture"
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>
        <h2 className="text-xl font-bold mb-4">
          Hello {userType === "admin" ? `Admin: ${capitalizeFirstLetter(userName)}` : `User: ${capitalizeFirstLetter(userName)}`}
        </h2>
        <div className="mt-6">
          <button
            onClick={onLogoutAction}
            className="px-4 py-2 text-red-500 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
