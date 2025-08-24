import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/utils/auth-bcrypt";
import { serialize } from "cookie";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders
    },
  });
}

export async function POST(request: NextRequest) {
  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders });
  }

  try {
    const body = await request.json();

    const user = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const isUser = await comparePasswords(body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);

      const response = NextResponse.json({}, { 
        status: 201,
        headers: {
          ...corsHeaders,
          'Set-Cookie': serialize(process.env.COOKIE_NAME!, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
        }
      });

      return response;
    } else {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ error: "Signin failed" }, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}
