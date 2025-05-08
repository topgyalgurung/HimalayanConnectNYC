"use client";

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === 200) {
      router.push("/profile");
    }
  }, [state, router]);
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <div className="w-1/3 h-1/2 bg-slate-100 p-6 rounded-lg shadow-lg mt-10">
        <h1 className="text-left text-black text-3xl">Sign Up</h1>
        <hr />
        <br />
        <form action={action}>
          <div>
            <input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
            />
          </div>
          {state?.errors?.firstName && <p>{state.errors.firstName}</p>}
          <div>
            <input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
            />
          </div>
          {state?.errors?.lastName && <p>{state.errors.lastName}</p>}

          <div>
            <input
              id="email"
              name="email"
              placeholder="Email"
              className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
            />
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}

          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="text-black p-2 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600 w-full"
            />
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            disabled={pending}
            type="submit"
            className="p-2 border text-white border-gray-300 bg-blue-500 rounder-lg mb-4 focus:outline-none focus:border-gray-600 w-full"
          >
            Sign Up
          </button>
          {/* <div>
            <SignIn />
          </div> */}
          <div className="flex justify-end">
            <Link href="/login" className="text-right">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
