

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getClientSession } from "@/app/lib/client-session";

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
      try {
        const session = await getClientSession();
        if (session?.userId && session?.email) {
          setUser({
            userId: session.userId,
            email: session.email,
            role: session.role || "USER",
            image: session.image,
          });
          return;
        }
      } catch {
        // Session is not available, user is not authenticated
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
