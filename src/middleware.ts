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
  const isPublicPage = publicPages.includes(pathname);
  const jwt = req.cookies.get(process.env.COOKIE_NAME!);

  // Handle root path (/)
  if (pathname === "/") {
    if (jwt) {
      // If user has JWT, try to verify it
      try {
        await verifyJWT(jwt.value);
        // JWT is valid, redirect to home
        req.nextUrl.pathname = "/home";
        return NextResponse.redirect(req.nextUrl);
      } catch (e) {
        // JWT is invalid, redirect to signin
        console.error("Invalid JWT at root:", e);
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
      }
    } else {
      // No JWT, redirect to signin
      req.nextUrl.pathname = "/signin";
      return NextResponse.redirect(req.nextUrl);
    }
  }

  // Handle public pages
  if (isPublicPage) {
    if (jwt) {
      try {
        await verifyJWT(jwt.value);
        // JWT is valid, redirect to home
        req.nextUrl.pathname = "/home";
        return NextResponse.redirect(req.nextUrl);
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
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error("JWT verification failed:", e);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};