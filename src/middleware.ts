import { NextRequest, NextResponse } from "next/server";

const roleRoutes = {
    ADMIN: ["/admin"],
    SUPER_MANAGER: ["/manager"],
    CLIENT: ["/client"],
} as const;

const LOGIN_PAGE = "/auth/login";

export default function middleware(req: NextRequest) {
    const role = req.cookies.get("USER_ROLE")?.value;
    const pathname = req.nextUrl.pathname;

    const isProtected =
        pathname.startsWith("/admin") ||
        pathname.startsWith("/manager") ||
        pathname.startsWith("/client");

    if (!isProtected) {
        return NextResponse.next();
    }

    if (!role) {
        return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
    }

    const allowedRoutes = roleRoutes[role as keyof typeof roleRoutes];

    if (
        allowedRoutes?.some(
            (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
        )
    ) {
        return NextResponse.next();
    }

    if (role in roleRoutes) {
        return NextResponse.redirect(
            new URL(roleRoutes[role as keyof typeof roleRoutes][0], req.url)
        );
    }

    return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
}

export const config = {
    matcher: ["/admin/:path*", "/manager/:path*", "/client/:path*"],
};
