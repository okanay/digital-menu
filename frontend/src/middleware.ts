import createMiddleware from "next-intl/middleware";
import { routing } from "./providers/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { SignInResponse } from "./validations/user";

async function authMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
      headers: {
        Cookie: request.headers.get('cookie') || '',
      },
    });

    if (!checkResponse.ok) throw new Error("Failed to check user");

    const data = await checkResponse.json();
    const validData = SignInResponse.safeParse(data.user);

    if (!validData.success) throw new Error("Failed to check user");

    const encryptedUserData = Buffer.from(JSON.stringify(validData.data)).toString('base64');
    response.headers.set('X-User-Data', encryptedUserData);

  } catch (error) {
    console.error("[AUTH-MIDDLEWARE] Failed to check user", error);
    response.headers.delete('X-User-Data');
  }

  return response;
}

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const publicPaths = ['/menu']; // Herkese açık path'leri buraya ekleyin
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // Önce i18n middleware'ini uygula
  const i18nResponse = intlMiddleware(request);

  // Eğer public path ise, sadece i18n middleware'ini uygula
  if (isPublicPath) {
    return i18nResponse;
  }

  // Değilse, hem i18n hem de auth middleware'ini uygula
  const authResponse = await authMiddleware(request);

  // i18n ve auth response'larını birleştir
  authResponse.headers.forEach((value, key) => i18nResponse.headers.set(key, value));

  return i18nResponse;
}

export const config = {
  matcher: ["/", "/(tr|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
