import { NextRequest, NextResponse } from "next/server";

import { canAccessPath, getFirstAvailableAppPath, normalizeSubscriptionTier } from "@/utils/access";

const protectedRoutes = ["/dashboard", "/blueprint", "/benchmarks", "/ai-coach", "/start", "/pricing"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("sla-access-token")?.value;
  const { pathname } = request.nextUrl;
  const onboardingComplete = request.cookies.get("sla-onboarding")?.value === "1";
  const selectedBusinessId = request.cookies.get("sla-selected-business")?.value ?? null;
  const tierCookie = request.cookies.get("sla-tier")?.value;
  const profile = {
    onboardingComplete,
    selectedBusinessId,
    tier: normalizeSubscriptionTier(tierCookie)
  } as const;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (pathname === "/login" && accessToken) {
    return NextResponse.redirect(new URL(getFirstAvailableAppPath(profile), request.url));
  }

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isProtectedRoute && accessToken && !canAccessPath(pathname, profile)) {
    return NextResponse.redirect(new URL(getFirstAvailableAppPath(profile), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/start/:path*", "/dashboard/:path*", "/blueprint/:path*", "/benchmarks/:path*", "/ai-coach/:path*", "/pricing/:path*"]
};
