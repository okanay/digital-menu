"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@/providers/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const VERIFY_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-email`;
type VerificationStatus = "loading" | "success" | "error";

export const useVerifyCheck = () => {
  const [alreadyFetch, setAlreadyFetch] = useState(false);

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState<string | null>(null);

  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleVerify = useCallback(async () => {
    if (alreadyFetch) return;
    setAlreadyFetch(true);

    if (auth.user?.emailVerified) {
      setStatus("error");
      setMessage("Your email is already verified, no need to verify again.");
      return;
    }

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    try {
      const response = await fetch(VERIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (response.ok) {
        if (auth.user) {
          auth.signIn({ ...auth.user, emailVerified: true });
        }

        setStatus("success");
        setMessage("Email verified successfully.");

        setTimeout(() => {
          router.push("/sign-in");
        }, 1000);
      } else {
        setStatus("error");
        setMessage(
          data.error ||
            "We were unable to verify your email address. Please try again or contact support.",
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        "We were unable to verify your email address. Please try again or contact support.",
      );
    }
  }, [searchParams, auth]);

  useEffect(() => {
    handleVerify();
  }, []);

  return { status, message };
};
