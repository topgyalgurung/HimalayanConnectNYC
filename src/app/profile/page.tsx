
"use client"
/**
 * note: redirect vs useRouter
 * redirect: redirect user after a mutation or event, in server component, server action
 * useRouter: perform client side navigation, in client
 */

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminDashboard from "../profile/AdminDashboard";
import UserDashboard from "../profile/UserDashboard";

import { getSession } from "@/app/lib/session";

export default function Profile() {
  // const session = await verifySession()
  // const userRole = session?.role;
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

  return (
    <div>{userRole === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}</div>
  );
}
