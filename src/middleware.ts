import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // ---------- PUBLIC PAGES ----------
  const publicPages = ["/", "/login", "/register"];

  const isPublic = publicPages.includes(pathname);

  if (
    process.env.NODE_ENV === "development" &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api")
  ) {
    console.log("ROLE:", token?.role);
    console.log("TOKEN:", token);
  }

  if (token && isPublic) {
    const redirectPath = getHomeByRole(token.role);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // ---------- PROTECTED ROUTES ----------
  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/staff") ||
    pathname.startsWith("/user");

  // ---------- 2) Belum login tapi buka protected route ----------
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ---------- 3) Sudah login tapi role tidak cocok ----------
  if (token && isProtected) {
    const allowedPath = getHomeByRole(token.role);

    if (!pathname.startsWith(allowedPath)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

/**
 * Map role → default homepage/path
 */
function getHomeByRole(role?: string): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "tu":
      return "/staff";
    case "calon_siswa":
      return "/user";
    default:
      return "/";
  }
}

export const config = {
  matcher: [
    "/",           // homepage
    "/login",
    "/register",
    "/admin/:path*",
    "/staff/:path*",
    "/user/:path*",
  ],
};
