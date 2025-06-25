"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";

interface ResetPasswordState {
  errors?: {
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  status?: number;
  success?: boolean;
}

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false); // show and hide password
  const searchParams = useSearchParams(); // to get the token from the url
  const token = searchParams.get("token");

    const [state, formAction, isPending] = useActionState<ResetPasswordState, FormData>(
        resetPassword,
        {
          errors: {
            password: [],
        confirmPassword: [],
          },
          message: "",
        }
      );

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-500">Invalid reset password link</p>
          <Link href="/login" className="text-blue-600 hover:underline mt-4 block">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        action={formAction}
        className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full space-y-4"
      >
        <input type="hidden" name="token" value={token} />
        <h2 className="text-xl text-black font-semibold text-center">
          Reset Password
        </h2>

        <div className="space-y-2">
          <label htmlFor="password" className="text-gray-700 font-medium">
            New Password
          </label>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter new password"
            className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            required
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
            <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-gray-700 font-medium">
            Confirm Password
          </label>
          <div className="relative">
          <input
           type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            required
          />
          <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              </div>
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-sm">{state.errors.confirmPassword[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full disabled:bg-gray-400"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {state?.message && (
        <p className={`text-sm mt-4 ${state.status === 400 ? "text-red-500" : "text-green-500"}`}>
          {state.message}
        </p>
      )}

      {state?.success && (
        <Link href="/login" className="mt-4 text-blue-600 hover:underline">
          Back to Login
        </Link>
      )}
    </div>
  );
};

export default ResetPassword;