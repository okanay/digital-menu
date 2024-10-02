"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@/providers/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { z } from "zod";

const RESET_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-reset`;
const FormValidation = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password must be at most 20 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
type VerificationStatus = "idle" | "loading" | "success" | "error";

export const usePasswordReset = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const validateForm = useCallback(() => {
    return FormValidation.safeParse({
      password: passwordRef.current?.value || "a",
      confirmPassword: confirmPasswordRef.current?.value || "b",
    });
  }, []);

  const handleResetPassword = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setStatus("loading");

      const validate = validateForm();
      if (!validate.success) {
        setStatus("error");
        setMessage(validate.error.errors[0].message);
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
        const response = await fetch(RESET_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            token,
            password: validate.data.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Your password has been reset successfully.");

          setTimeout(() => {
            router.push("/sign-in");
          }, 1000);
        } else {
          setStatus("error");
          setMessage(
            data.error ||
              "We were unable to reset your password. Please try again or contact support.",
          );
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          "We were unable to reset your password. Please try again or contact support.",
        );
      }
    },
    [searchParams, status, validateForm],
  );

  return {
    passwordRef,
    confirmPasswordRef,
    status,
    message,
    handleResetPassword,
  };
};
