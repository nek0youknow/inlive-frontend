import { NextRequest, NextResponse } from "next/server";

const roleRoutes = {
    ADMIN: ["/admin"],
    SUPER_MANAGER: ["/manager"],
    CLIENT: ["/client"]
};

const LOGIN_PAGE = "/auth/login";

export async function middleware(req: NextRequest) {
    const role = req.cookies.get("USER_ROLE")?.value;

    if (!role) {
        return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
    }

    const pathname = req.nextUrl.pathname;

    const allowedRoutes = roleRoutes[role as keyof typeof roleRoutes];

    if (allowedRoutes?.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    if (role in roleRoutes) {
        return NextResponse.redirect(new URL(roleRoutes[role as keyof typeof roleRoutes][0], req.url));
    }

    return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
}

export const config = {
    matcher: ["/admin/:path*", "/manager/:path*", "/client/:path*"],
};
