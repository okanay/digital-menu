"use client";

import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { SignInResponse } from "@/validations/user";

export const CheckUserIsLoggedIn = () => {
  const auth = useAuth();
  if (!auth) return null;

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleCheckUserIsLogin = async () => {
    if (auth.session !== "loading") return;

    const CHECK_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`;

    try {
      const response = await fetch(CHECK_URL, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      const validResponse = SignInResponse.safeParse(data.user);

      if (validResponse.success) {
        console.log("[AUTH] User is logged in.");
        auth.signIn(validResponse.data as User);
      } else {
        console.log("[AUTH] User is not logged in.");
        handleSignOut();
      }
    } catch (error) {
      console.error(
        "An error occurred while checking user login status.",
        error,
      );
      handleSignOut();
    }
  };

  useEffect(() => {
    handleCheckUserIsLogin();
  }, []);

  return <></>;
};
