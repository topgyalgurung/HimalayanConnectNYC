"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserProvider";

export default function LoginForm() {
  const { setUser } = useUser(); // Get context
  const [state, action] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === 200 && state.user) {
      setUser(state.user); // Update global state
      router.refresh();
      router.push("/profile");
    }
  }, [state, router, setUser]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <div className="w-1/3 h-1/2 bg-slate-100 p-6 rounded-lg shadow-lg mt-10">
        <h1 className="text-left text-black text-3xl">Login to your account</h1>
        <hr />
        <br />
        <section>
          <form action={action}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm mb-2">
                {state.errors.email[0]}
              </p>
            )}
            {state?.status === 200 && (
              <p className="text-green-500 text-sm mb-2">Login successful!</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {state?.errors?.password && (
              <p className="text-red-500 text-sm mb-2">
                {state.errors.password[0]}
              </p>
            )}
            <br />
            <button
              type="submit"
              className="p-2 border text-white border-gray-300 bg-blue-500 rounder-lg mb-4 focus:outline-none focus:border-gray-600 w-full"
            >
              Login
            </button>
          </form>
          <div>
            <div className="flex justify-end">
              <Link href="/signup" className="text-right">
                Don&apos;t have an account? Register
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
