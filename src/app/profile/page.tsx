"use client";

/**
 * note: redirect vs useRouter
 * redirect: redirect user after a mutation or event, in server component, server action
 * useRouter: perform client side navigation, in client
 */
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminDashboard from "../profile/AdminDashboard";
import UserDashboard from "../profile/UserDashboard";
import { getSession } from "../lib/session";

export default function Profile() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) {
        router.replace("/login");
      } else {
        setUserRole(session?.role);
      }
    };
    fetchSession();
  }, [router]);

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
      <div>
        <h1>Profile</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-red rounded-lg transition-colors flex items-center"
        >
          Logout
        </button>
      </div>
      <div> Dashboard</div>
      {userRole === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}
