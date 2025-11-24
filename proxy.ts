import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const publicPages = ["/", "/login", "/register"];

  if (token && publicPages.some(p => pathname.startsWith(p))) {
    let redirectPath = "/user";
    if (token.role === "admin") redirectPath = "/admin";
    if (token.role === "petugas") redirectPath = "/petugas";

    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  const isAdmin = pathname.startsWith("/admin");
  const isPetugas = pathname.startsWith("/petugas");
  const isUser = pathname.startsWith("/user");

  // BELUM LOGIN → BLOK AKSES HALAMAN PROTECTED
  if (!token && (isAdmin || isPetugas || isUser)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    if (isAdmin && token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isPetugas && token.role !== "petugas") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isUser && token.role !== "calon_siswa") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/admin/:path*",
    "/petugas/:path*",
    "/user/:path*",
  ],
};
