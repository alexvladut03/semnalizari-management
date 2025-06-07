import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*"], // protejează orice subpagină din /admin
};
