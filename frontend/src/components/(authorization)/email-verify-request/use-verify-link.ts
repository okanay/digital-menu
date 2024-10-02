"use client";

import { useRef, useState } from "react";
import { z } from "zod";

const VERIFY_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-email-request`;

type Status = "loading" | "success" | "error" | "idle";

// Form validation schema
const FormValidation = z.object({
  email: z.string().email("Invalid email address").max(64, "Email too long"),
});

export const useVerifyLink = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    const email = emailRef.current?.value;
    const validateEmail = FormValidation.safeParse({ email });

    if (validateEmail.success === false) {
      setStatus("error");
      setMessage(validateEmail.error.errors[0].message);
      return;
    }

    try {
      const response = await fetch(VERIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: validateEmail.data.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Verification email sent. Please check your inbox.");
      } else {
        setStatus("error");
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return { emailRef, message, status, handleRequest };
};
