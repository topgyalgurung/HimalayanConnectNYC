"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserProvider";
import { SignIn } from "@/app/components/auth/signin-button";

export default function LoginForm() {
  const { setUser } = useUser(); // Get context
  const [state, action] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false); // Add this line
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
        <h1 className="text-left text-black text-3xl">Login</h1>
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
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div className="flex justify-end mt-1">
              <Link
                href="/forgotpassword"
                className="text-m text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
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
            {state?.errors?.password && <p>{state.errors.password}</p>}
            <br />
            <button
              type="submit"
              className="p-2 border text-white border-gray-300 bg-blue-500 rounder-lg mb-4 focus:outline-none focus:border-gray-600 w-full"
            >
              Login
            </button>
          </form>
          <div>
            <SignIn />
          </div>
          <div className="flex justify-end">
            <Link href="/signup" className="text-right">
              Don't have an account?
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
