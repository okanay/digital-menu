"use client";

import { useAuth } from "@/hooks/use-auth";
import { Link, usePathname } from "@/providers/i18n/routing";

export const EmailVerifyWarning = () => {
  const auth = useAuth();
  const pathname = usePathname();

  if (pathname === "/email-verify-request") return;
  if (pathname === "/email-verify-link") return;
  if (auth.session !== "authorize") return;

  return (
    <>
      {!auth.user?.emailVerified && (
        <div className="fixed bottom-0 z-[9999] flex w-full items-center justify-center border-t border-corner/10 bg-primary-200/20 p-2.5 text-center font-custom-mono text-xs text-font backdrop-blur-lg dark:bg-primary-900/40">
          <p className="max-w-[320px] sm:max-w-full">
            Your email is{" "}
            <span className="font-semibold text-primary-500 underline dark:text-primary-400">
              not verified
            </span>
            . Please check your email or click{" "}
            <Link
              className="font-semibold text-primary-500 underline dark:text-primary-400"
              href="/email-verify-request"
            >
              here
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
};
