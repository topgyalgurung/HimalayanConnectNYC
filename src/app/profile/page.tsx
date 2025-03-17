"use client";

import { logout } from "../actions/auth";

import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("logout failed", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-red rounded-lg transition-colors flex items-center"
      >
        Logout
      </button>
    </div>
  );
}
