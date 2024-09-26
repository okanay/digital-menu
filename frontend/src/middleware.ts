import createMiddleware from "next-intl/middleware";

import { locales } from "./locales";
import { type NextRequest, type NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en" satisfies Locale,
  localePrefix: "never",
});

export default function (req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|_next|public|images|.*\\..*).*)',
    "/((?!api|_next|_vercel|images|.*\\..*).*)",
    '/((?!(?:en|tr|api|_next/static|_next/image|images)(?:/|$))(?!.*\\.[^.]*$).*/?)',
  ]
};
