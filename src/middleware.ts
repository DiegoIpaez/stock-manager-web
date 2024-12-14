import httpStatus from "http-status";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CONFIG } from "./constants";

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: CONFIG.NEXTAUTH.SECRET });
  if (session) {
    const requestHeaders = new Headers({
      ...req.headers,
      ...corsOptions,
    });
    requestHeaders.set("uid", session?.id?.toString() ?? "");

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const path = req?.nextUrl?.pathname;
  if (path && path.startsWith("/api/")) {
    const unauthorizedError = {
      message: "No autorizado",
      statusCode: httpStatus.UNAUTHORIZED,
    };
    return NextResponse.json(
      { error: unauthorizedError },
      { status: unauthorizedError.statusCode }
    );
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/", "/admin/:path*", "/api/users/:path*"],
};
