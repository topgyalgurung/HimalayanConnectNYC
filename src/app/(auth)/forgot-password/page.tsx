import ForgotPassword from "@/app/ui/auth/forgot-password";

import { Suspense } from 'react';
const ForgotPasswordPage = () => {
  return (
    <div>
      <Suspense>
         <ForgotPassword />
      </Suspense>
     
    </div>
  );
};

export default ForgotPasswordPage;
