import ResetPassword from "@/app/components/auth/reset-password";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Loading...</p>
          </div>
        </div>
      }>
        <ResetPassword />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
