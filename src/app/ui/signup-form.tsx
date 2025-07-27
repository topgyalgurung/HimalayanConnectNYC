"use client";

/**
 * SignupForm Component
 * A form component that handles user registration
 * Uses React Server Actions for form submission
 * Manages form state and user registration flow
 */

import { signup } from "@/app/lib/auth";
import { useActionState } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserProvider";

export default function SignupForm() {
  const { setUser } = useUser();
  const [state, formAction, isPending] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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

  useEffect(() => {
    if (state?.status === 200) {
      router.push("/profile");
    }
  }, [state, router]);

  return (
    // next todo: implement material UI

    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <div className="w-full max-w-lg  bg-slate-100 p-6 rounded-lg shadow-lg mt-10 mx-4 md:mx-auto">
        <h1 className="text-center text-black text-3xl">Sign Up</h1>
        <hr />

        <form action={formAction}>
          {/* firstname */}
          <div>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="text-black p-2 border border-gray-50 rounded-md mb-6  mt-5 focus:outline-none focus:border-gray-600 w-full"
            />
          </div>
          {state?.errors?.firstName && (
            <p className="text-red-500 text-sm mb-2">
              {state.errors.firstName}
            </p>
          )}
          {/* lastname */}
          <div>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="text-black p-2 border border-gray-50 rounded-md mb-6 focus:outline-none focus:border-gray-600 w-full"
            />
          </div>
          {state?.errors?.lastName && (
            <p className="text-red-500 text-sm mb-2">{state.errors.lastName}</p>
          )}

          <div>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="text-black p-2 border border-gray-50 rounded-md mb-6 focus:outline-none focus:border-gray-600 w-full"
            />
          </div>
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mb-2">{state.errors.email}</p>
          )}
          {state?.status === 400 && state?.message && (
            <p className="text-red-500 text-sm mb-2">{state.message}</p>
          )}

          {/* password  */}
          <div className="relative mb-6">
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
          {!state?.status && state?.errors?.password && (
            <div className="text-red-500 text-sm mb-2">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          {/* signup  */}
          <button
            // disabled={pending}
            type="submit"
            className="p-2 border text-white border-gray-300 bg-blue-500 rounder-lg mb-6 focus:outline-none focus:border-gray-600 w-full"
          >
            {isPending ? "Signing up ..." : "Sign Up"}
          </button>
          <div className="flex justify-end">
            <Link
              href="/login"
              className="text-right text-green-600 hover:underline focus:outline:none text-md"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
