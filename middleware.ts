import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const protectedRoute =
    pathname.startsWith("/tasks") || pathname.startsWith("/create");

  const access = req.cookies.get("access_token")?.value;

  if (protectedRoute && !access) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAuthPage && access) {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/login", "/register", "/tasks", "/create/:path*"],
};
