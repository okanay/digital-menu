"use client";

import { FormTitle } from "../ui/form-title";
import { useVerifyCheck } from "./use-verify-check";

export const EmailVerifyCheckStatus = () => {
  const { status, message } = useVerifyCheck();

  return (
    <div className="mt-4 text-balance text-center text-sm text-font-primary">
      {
        {
          loading: (
            <div className="flex flex-col items-center justify-center space-y-4">
              <FormTitle className="text-font">Verifying...</FormTitle>
              <p>
                Please wait while we verify your email address. This may take a
                few seconds.
              </p>
            </div>
          ),
          success: (
            <div className="flex flex-col items-center justify-center space-y-4">
              <FormTitle>Email verified successfully.</FormTitle>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Thank you for verifying your email address. You can now login to
                your account.
              </p>
            </div>
          ),
          error: (
            <div className="flex flex-col items-center justify-center space-y-4">
              <FormTitle className="text-rose-500 dark:text-rose-400">
                Email verification failed
              </FormTitle>
              <p>{message}</p>
            </div>
          ),
        }[status]
      }
    </div>
  );
};
