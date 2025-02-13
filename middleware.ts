import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("ebuddy_recruitment");

  // Redirect to login if no token and not on /login
  if (!token && !req.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect authenticated users from /login to /dashboard
  if (
    token &&
    (req.nextUrl.pathname.replace(/\/$/, "") === "/auth/login" ||
      req.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

// Matcher for pages only
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
