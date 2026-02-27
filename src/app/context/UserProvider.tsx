

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "@/app/lib/session";

export interface User {
  userId?: string;
  email: string;
  role: string;
  image?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * UserProvider component
 * Provides user context to the application
 * Supports both custom JWT sessions and NextAuth sessions
 */

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      // First try custom JWT session
      const customSession = await getSession();
      if (customSession) {
        setUser(customSession);
        return;
      }

      // Fallback: check NextAuth session
      try {
        const res = await fetch("/api/auth/session");
        const nextAuthSession = await res.json();
        if (nextAuthSession?.user?.email) {
          setUser({
            userId: nextAuthSession.userId || nextAuthSession.user?.id,
            email: nextAuthSession.email || nextAuthSession.user?.email,
            role: nextAuthSession.role || "USER",
            image: nextAuthSession.user?.image,
          });
          return;
        }
      } catch {
        // NextAuth session not available, user is not authenticated
      }

      setUser(null);
    };
    fetchSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
