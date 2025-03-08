"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("Sending signup data: ", user);
      const response = await axios.post("/api/auth/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: unknown) {
      console.log("Sign up failed !!!", error);
      // use toast
      toast.error(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.firstName.length > 0 &&
      user.lastName.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <div className="w-1/3 h-1/2 bg-slate-100 p-6 rounded-lg shadow-lg mt-10">
        <h1 className="text-left text-black text-3xl">
          {loading ? "Processing" : "Signup"}
        </h1>
        <hr />
        <br />

        <input
          className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
          id="firstName"
          type="text"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          placeholder="First Name"
        />

        <input
          className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
          id="lastName"
          type="text"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          placeholder="Last Name"
        />

        <input
          className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <input
          className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        <button
          onClick={onSignup}
          className="p-2 border text-white border-gray-300 bg-blue-500 rounder-lg mb-4 focus:outline-none focus:border-gray-600 w-full"
        >
          {buttonDisabled ? "All Field Required " : "Sign up"}
        </button>

        <div className="flex justify-end">
          <Link href="/login" className="text-right">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
