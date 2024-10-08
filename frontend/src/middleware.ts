import createMiddleware from "next-intl/middleware";
import { routing } from "./providers/i18n/routing";
import { NextRequest } from "next/server";

const i18nMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}

export const config = {
  matcher: ["/", "/(tr|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
