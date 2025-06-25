"use client";
/**
 * handles user authentication, uses react server actions for form submission
 * and manages form state and user authentication flow
 */
// useActionState for form instead of onSubmit:
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { useUser } from "@/app/context/UserProvider";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false); // show and hide password
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { setUser } = useUser(); // Get context
  const router = useRouter();

  useEffect(() => {
    if (state?.status === 200 && state.user) {
      setUser(state.user); // Update global state
      router.refresh();
      router.push("/profile");
    }
  }, [state, router, setUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    // next todo: implement material UI
    <div className="flex flex-col w-full items-center justify-start min-h-screen py-2">
      <div className="w-full max-w-lg bg-slate-100 p-6 rounded-lg shadow-lg mt-10 mx-4 md:mx-auto">
        <h1 className=" text-black text-3xl text-center">
          Login to your account
        </h1>
        <hr />
        <br />
        <section>
          <form action={formAction}>
            {/* email section  */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full mt-3"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm mb-2">
                {state.errors.email[0]}
              </p>
            )}
            {state?.status === 401 && state?.message && (
              <p className="text-red-500 text-sm mb-2">{state.message}</p>
            )}
            {state?.status === 200 && (
              <p className="text-green-500 text-sm mb-2 ">Login successful!</p>
            )}
            <div className="flex justify-end mt-1">
              <Link
                href="/forgot-password"
                className="text-m text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            {/* password section */}
            <div className="relative mt-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>
          <div>
            <div className="flex justify-end mt-3">
              <Link
                href="/signup"
                className="text-right text-red-500 hover:underline focus:outline:none text-md"
              >
                Don&apos;t have an account? Register
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
