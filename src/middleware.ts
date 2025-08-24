import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicPage = ["/signin", "/register"];

const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  return payload;
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicPage = publicPage.includes(pathname);
  const jwt = req.cookies.get(process.env.COOKIE_NAME!);

  if (isPublicPage) {
    if (jwt) {
      req.nextUrl.pathname = "/home";
      return NextResponse.redirect(req.nextUrl);
    } else {
      return NextResponse.next();
    }
  }

  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);

    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
