import { type JWT } from "next-auth";
import httpStatus from "http-status";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CONFIG } from "./constants";

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function matchPathWithId(path: string, permission: string) {
  const regexPath = permission?.replace(":id", "(\\d+)");
  const regex = new RegExp(`^${regexPath}$`);
  const match = path.match(regex);

  return match;
}

export async function middleware(req: NextRequest) {
  const session: JWT | null = (await getToken({
    req,
    secret: CONFIG.NEXTAUTH.SECRET,
  })) as JWT | null;

  const path = req?.nextUrl?.pathname;
  const isApiPath = path && path?.startsWith("/api/");

  const unauthorizedError = {
    message: "No autorizado",
    statusCode: httpStatus.UNAUTHORIZED,
  };

  if (!session) {
    if (!isApiPath) return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.json(
      { error: unauthorizedError },
      { status: unauthorizedError.statusCode }
    );
  }

  const permission = session.role?.roles_permissions?.find(({ permission }) => {
    if (!permission?.path || !permission?.method) return false;
    const isValidMethod = permission?.method === req.method;
    const isMatchPathWithId = matchPathWithId(path, permission?.path ?? "");
    if (isMatchPathWithId) return isValidMethod;

    const isValidPath = permission?.path?.includes(path);
    return isValidMethod && isValidPath;
  });

  if (!permission) {
    if (!isApiPath) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }
    return NextResponse.json(
      { error: unauthorizedError },
      { status: unauthorizedError.statusCode }
    );
  }

  const requestHeaders = new Headers({
    ...req.headers,
    ...corsOptions,
  });

  requestHeaders.set("uid", session?.id?.toString() ?? "");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/", "/admin/:path*", "/api/users/:path*"],
};
