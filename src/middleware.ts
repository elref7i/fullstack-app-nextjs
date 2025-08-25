// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicPages = ["/signin", "/register"];

const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  return payload;
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ تأكد إن الـ API routes مش بتمر عبر الـ middleware
  if (pathname.startsWith("/api/")) {
    console.log("API route detected, skipping middleware:", pathname);
    return NextResponse.next();
  }

  // ✅ تأكد إن الـ static files مش بتمر عبر الـ middleware
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isPublicPage = publicPages.includes(pathname);
  const jwt = req.cookies.get(process.env.COOKIE_NAME!);

  console.log("Middleware running for:", pathname, {
    hasJWT: !!jwt,
    isPublicPage,
  });

  // Handle root path (/)
  if (pathname === "/") {
    if (jwt) {
      // If user has JWT, try to verify it
      try {
        await verifyJWT(jwt.value);
        // JWT is valid, redirect to home
        const homeUrl = new URL("/home", req.url);
        return NextResponse.redirect(homeUrl);
      } catch (e) {
        // JWT is invalid, redirect to signin
        console.error("Invalid JWT at root:", e);
        const signinUrl = new URL("/signin", req.url);
        return NextResponse.redirect(signinUrl);
      }
    } else {
      // No JWT, redirect to signin
      const signinUrl = new URL("/signin", req.url);
      return NextResponse.redirect(signinUrl);
    }
  }

  // Handle public pages
  if (isPublicPage) {
    if (jwt) {
      try {
        await verifyJWT(jwt.value);
        // JWT is valid, redirect to home
        const homeUrl = new URL("/home", req.url);
        return NextResponse.redirect(homeUrl);
      } catch (e) {
        // JWT is invalid, allow access to public page
        console.error("Invalid JWT on public page:", e);
        return NextResponse.next();
      }
    } else {
      // No JWT, allow access to public page
      return NextResponse.next();
    }
  }

  // Handle protected pages
  if (!jwt) {
    const signinUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signinUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error("JWT verification failed:", e);
    const signinUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signinUrl);
  }
}

// ✅ الحل الأهم: تحديث الـ matcher
export const config = {
  // استثناء API routes و static files و Next.js internals
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
