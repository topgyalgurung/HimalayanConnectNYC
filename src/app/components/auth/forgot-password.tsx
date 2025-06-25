"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/app/actions/auth";
import { User } from "@prisma/client";

interface ForgotPasswordState {
  errors?: {
    email?: string[];
  };
  message?: string;
  status?: number;
  success?: boolean;
  user?: User;
}


const ForgotPassword = () => {
    const [state, formAction, isPending] = useActionState<ForgotPasswordState, FormData>(
        forgotPassword,
        {
          errors: {
            email: [],
          },
          message: "",
        }
      );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        action={formAction}
        className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full space-y-4"
      >
        <h2 className="text-xl text-black font-semibold text-center">
          Forgot Password
        </h2>

        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            required
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full disabled:bg-gray-400"
        >
          {isPending ? "Sending..." : "Request Reset Link"}
        </button>
      </form>

      {state?.message && (
        <p className={`text-sm mt-4 ${state.status === 404 ? "text-red-500" : "text-green-500"}`}>
          {state.message}
        </p>
      )}
      
      {state?.success && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm mt-2">
            If you don&apos;t see the email, please check your spam folder
          </p>
        </div>
      )}

      <Link 
        href="/login" 
        className="mt-4 text-blue-600 hover:underline"
      >
        Back to Login
      </Link>

    </div>
  );
};

export default ForgotPassword;  