"use client";

import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { usePathname, useRouter } from "../i18n/routing";

type RouteProps = {
  children: React.ReactNode;
  accessLevel: "none" | "protected" | "non-auth-paths" | "admin";
};

function isNonAuthenticatedPath(pathname: string): boolean {
  return NON_AUTHENTICATED_PATHS.some((path) => pathname.includes(path));
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((path) => pathname.includes(path));
}

const PROTECTED_PATHS = ["/dashboard"];
const NON_AUTHENTICATED_PATHS = [
  "/sign-in",
  "/sign-up",
  "/password-reset",
  "/password-reset-request",
];

export const ProtectedRoute: React.FC<RouteProps> = ({
  children,
  accessLevel = "public",
}) => {
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      isNonAuthenticatedPath(pathname) &&
      accessLevel === "non-auth-paths" &&
      auth.user
    ) {
      router.push("/");
    }

    if (
      isProtectedPath(pathname) &&
      accessLevel === "protected" &&
      !auth.user
    ) {
      router.push("/sign-in");
    }
  }, []);

  return <>{children}</>;
};
