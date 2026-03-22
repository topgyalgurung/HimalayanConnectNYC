"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signIn } from "next-auth/react";

import { login } from "@/app/lib/auth";
import { useUser } from "@/app/context/UserProvider";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (state?.status === 200 && state.user) {
      setUser(state.user);
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

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/profile" });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-start min-h-screen py-2">
      <div className="w-full max-w-lg bg-slate-100 p-6 rounded-lg shadow-lg mt-10 mx-4 md:mx-auto">
        <h1 className=" text-black text-3xl text-center">
          Login to your account
        </h1>
        <hr />
        <br />
        <section>
          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="flex items-center justify-center gap-3 w-full p-2 border border-gray-300 rounded-md mb-4 bg-white hover:bg-gray-50 transition-colors text-black"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
          </button>

          <div className="flex items-center gap-4 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

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
