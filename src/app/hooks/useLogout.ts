import { useRouter } from "next/navigation";
import { useUser } from "../context/UserProvider";
import { logout } from "../actions/auth";

export function useLogout() {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      await logout(); // calls server action
      setUser(null); // clear user state
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { handleLogout };
}