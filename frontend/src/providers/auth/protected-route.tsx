"use client";

import { useAuth } from "@/hooks/use-auth";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";

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

const PROTECTED_PATHS = [
  "/dashboard",
  "/shops",
  "/account",
  "/statistics",
  "/menus",
  "/help",
];
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
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (accessLevel === "non-auth-paths" && auth.user) {
      if (isNonAuthenticatedPath(pathname)) {
        router.push("/");
      }
    }

    if (accessLevel === "protected" && auth.session === "unauthorize") {
      if (isProtectedPath(pathname)) {
        router.push("/sign-in");
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};
