import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        // Role-based route protection
        if (pathname.startsWith("/admin")) {
            if (token?.role !== "SUPER_ADMIN") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        if (pathname.startsWith("/dashboard")) {
            const allowedRoles = ["SUPER_ADMIN", "PRO_START", "PRO_GROW", "PRO_ELITE"];
            if (!token?.role || !allowedRoles.includes(token.role)) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        if (pathname.startsWith("/paciente")) {
            const allowedRoles = ["SUPER_ADMIN", "PATIENT"];
            if (!token?.role || !allowedRoles.includes(token.role)) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/paciente/:path*",
        "/admin/:path*",
    ],
};
