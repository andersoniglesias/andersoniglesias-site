import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new Response("Autenticação necessária", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = atob(base64Credentials);
  const [username, password] = credentials.split(":");

  const validUser = process.env.ADMIN_USER;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (username !== validUser || password !== validPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};