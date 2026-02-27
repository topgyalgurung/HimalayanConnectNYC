import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserProvider";
import { logout } from "@/app/lib/auth";
import { signOut } from "next-auth/react";

export function useLogout() {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      // Clear custom JWT session
      await logout();
      // Clear NextAuth session (no redirect, we handle it manually)
      await signOut({ redirect: false });
      setUser(null); // clear user state
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { handleLogout };
}