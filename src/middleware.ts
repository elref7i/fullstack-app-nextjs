import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // Handle API routes CORS
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    
    // Add CORS headers to all API responses
    Object.entries({
      ...corsHeaders,
      'Access-Control-Allow-Credentials': 'true',
    }).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

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
  matcher: ['/((?!_next|.*\\..*).*)', '/api/:path*'],
};