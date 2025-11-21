import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;

    if (req.nextUrl.pathname === "/") {
      if (role === "admin") {
        return Response.redirect(new URL("/admin", req.url));
      }
      if (role === "tu") {
        return Response.redirect(new URL("/staff", req.url));
      }
      if (role === "calon_siswa") {
        return Response.redirect(new URL("/user", req.url))
      }
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);


export const config = {
  matcher: [
    "/",            // halaman root
    "/admin/:path*", 
    "/siswa/:path*",
  ],
};
