
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
import { getClientSession } from "@/app/lib/client-session";

export default function Profile() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getClientSession();
        if (!session?.userId) {
          router.replace("/login");
          return;
        }

        setUserRole(session.role);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <div>{userRole === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}</div>
  );
}
