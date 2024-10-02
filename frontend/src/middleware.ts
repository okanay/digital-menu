import createMiddleware from "next-intl/middleware";
import { routing } from "./providers/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/sign-in", "/sign-up", "/forgot-password"];
const PROTECTED_PATHS = ["/dashboard"];
const AUTH_COOKIE = "uas";

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.includes(path));
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((path) => pathname.includes(path));
}

function authMiddleware(request: NextRequest): NextResponse | undefined {
  // const { pathname } = request.nextUrl;
  // const authToken = request.cookies.get(AUTH_COOKIE)?.value;

  // if (authToken === "1") {
  //   if (isPublicPath(pathname) && authToken) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   if (isProtectedPath(pathname) && !authToken) {
  //     return NextResponse.redirect(new URL("/sign-in", request.url));
  //   }
  // }

  return undefined;
}

const i18nMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // First, check auth
  const authRedirect = authMiddleware(request);
  if (authRedirect) return authRedirect;

  // If no auth redirect, apply i18n middleware
  return i18nMiddleware(request);
}

export const config = {
  matcher: ["/", "/(tr|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
