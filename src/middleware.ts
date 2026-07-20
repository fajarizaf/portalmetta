import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/login");
  if (isAuthPage && token) return NextResponse.redirect(new URL("/", req.url));

  const isAdminRoute = pathname.startsWith("/admin");
  const isCustomerRoute = pathname.startsWith("/customer");
  const isProtected = isAdminRoute || isCustomerRoute;

  if (isProtected && !token) return NextResponse.redirect(new URL("/login", req.url));

  const role = (token as JWT & { role?: string })?.role;
  if (isAdminRoute && token && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/customer", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/login"],
};