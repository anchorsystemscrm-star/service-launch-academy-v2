import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/blueprint", "/benchmarks", "/ai-coach"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("sla-access-token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (pathname === "/login" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/blueprint/:path*", "/benchmarks/:path*", "/ai-coach/:path*"]
};
