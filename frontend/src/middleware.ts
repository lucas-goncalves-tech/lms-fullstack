import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "./lib/constants/public-routes";

export function middleware(req: NextRequest) {
  const sidName =
    process.env.NODE_ENV === "development" ? "sid" : "__Secure-sid";
  const sid = req.cookies.get(sidName)?.value;

  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);

  if (sid && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!sid && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
