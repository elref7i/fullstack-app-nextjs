import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/utils/auth-bcrypt";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 204,
      headers: corsHeaders 
    });
  }
  try {
    const body = await request.json();

    // (اختياري) تحقق سريع من صحة المدخلات
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return NextResponse.json(
      { error: "Missing fields" },
      {
        status: 400,
        headers: corsHeaders,
      }
    );
    }

    // (اختياري) تأكد إن الإيميل مش متسجل
    const existing = await db.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return NextResponse.json(
      { error: "Email already in use" },
      {
        status: 409,
        headers: corsHeaders,
      }
    );
    }

    const user = await db.user.create({
      data: {
        email: body.email,
        password: await hashPassword(body.password),
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });

    const jwt = await createJWT({ id: user.id, email: user.email });

    const res = NextResponse.json(
      {},
      {
        status: 201,
        headers: {
          ...corsHeaders,
          'Access-Control-Allow-Credentials': 'true',
        },
      }
    );
    
    res.cookies.set({
      name: process.env.COOKIE_NAME!,
      value: jwt,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // One week
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
