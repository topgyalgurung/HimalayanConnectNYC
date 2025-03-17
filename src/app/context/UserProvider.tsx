"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "@/app/lib/session";

interface User {
  userId: string;
  email: string;
  role: string;
  image?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{
    userId: string;
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
