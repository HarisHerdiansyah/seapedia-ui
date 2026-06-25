import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/authentication/login",
  "/authentication/register",
  "/home",
  "/product",
  "/review",
];

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

  if (!isPublicRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  if (refreshToken && pathname.includes("login")) {
    return NextResponse.redirect(
      new URL("/authentication/active-role", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
