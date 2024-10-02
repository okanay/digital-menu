import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@/providers/i18n/routing";
import { SignInResponseValidate } from "@/validations/user";
import { useRef, useState } from "react";
import { z } from "zod";

// Form validation schema
const FormValidation = z.object({
  email: z.string().email("Invalid email address").max(64, "Email too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
});

// Constants
const LOGIN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;

// Types
type FormStatus = "idle" | "loading" | "error";

export const useLogin = () => {
  // Refs for form inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // State management
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const router = useRouter();
  const auth = useAuth();

  // Form submission handler
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      // Validate form data
      const formData = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      const validatedData = validateFormData(formData);

      // Send login request
      const userData = await sendLoginRequest(validatedData);

      // Handle successful login
      handleSuccessfulLogin(userData);
    } catch (err) {
      handleLoginError(err);
    }
  };

  // Helper functions
  const validateFormData = (data: { email?: string; password?: string }) => {
    const result = FormValidation.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.errors[0].message);
    }
    return result.data;
  };

  const sendLoginRequest = async (data: z.infer<typeof FormValidation>) => {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    return response.json();
  };

  const handleSuccessfulLogin = (data: any) => {
    const validatedResponse = SignInResponseValidate.safeParse(data.user);

    if (!validatedResponse.success) {
      throw new Error("Invalid response from server");
    }

    auth.signIn(validatedResponse.data);
    router.push("/");
  };

  const handleLoginError = (err: unknown) => {
    setStatus("error");
    setError(
      err instanceof Error ? err.message : "An unexpected error occurred",
    );
  };

  return {
    emailRef,
    passwordRef,
    status,
    error,
    submitForm,
    auth,
    router,
  };
};
