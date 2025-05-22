/**
 * @file UserProvider.tsx
 * @description A React context provider component that manages user session data on the client side.
 * This component provides user authentication state and session management functionality
 * throughout the application.
 * 
 * @module UserProvider
 * @exports UserProvider
 * @exports useUser
 * 
 * // Use the user context in any component
 * const { user, setUser } = useUser();
 */

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "@/app/lib/session";

export interface User {
  userId?: string;
  // firstName: string;
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
 * Manages user session data on the client
 */

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{
    userId?: string;
    // firstName: string;
    email: string;
    role: string;
    image?: string;
  } | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUser(session);
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
