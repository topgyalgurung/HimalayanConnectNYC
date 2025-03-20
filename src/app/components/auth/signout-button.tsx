"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button onClick={() => signOut("google", { redirectTo: "/" })}>
      Sign Out
    </button>
  );
}
