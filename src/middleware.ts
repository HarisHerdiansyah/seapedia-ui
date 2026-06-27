import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES, AUTH_ROUTES } from "./constants/routes";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || (route !== "/" && pathname.startsWith(route)));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // If trying to access a private route and not logged in
  if (!isPublicRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  // If already logged in and trying to access login/register
  if (refreshToken && isAuthRoute) {
    return NextResponse.redirect(
      new URL("/authentication/active-role", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
