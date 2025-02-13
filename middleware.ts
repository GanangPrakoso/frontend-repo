import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("ebuddy_recruitment");

  if (!token && !req.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (
    token &&
    (req.nextUrl.pathname.replace(/\/$/, "") === "/auth/login" ||
      req.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets/).*)"],
};
