"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Add this line
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", user);
      console.log("Login success", response.data);
      router.push("/");
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error || "Login failed. Please try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("Login failed:", errorMessage);
      // set error message from backend
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <div className="w-1/3 h-1/2 bg-slate-100 p-6 rounded-lg shadow-lg mt-10">
        <h1 className="text-left text-black text-3xl">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr />
        <br />
        <input
          className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <div className="flex justify-end mt-1">
          <Link
            href="/passwordforgot"
            className="text-m text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <input
            className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
            id="password"
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button
            type="button"
            className="absolute right-2 top-2.5 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={onLogin}
            className="p-2 border text-white border-gray-300 bg-blue-500 rounder-lg mb-4 focus:outline-none focus:border-gray-600 w-full"
          >
            Login here
          </button>

          <div className="flex justify-end">
            <Link href="/signup" className="text-right">
              Don't have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
