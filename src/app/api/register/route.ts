import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/utils/auth-bcrypt";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  try {
    const body = await request.json();

    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    const existing = await db.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { 
          status: 409,
          headers: corsHeaders
        }
      );
    }

    const user = await db.user.create({
      data: {
        email: body.email.toLowerCase(),
        password: await hashPassword(body.password),
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
      },
    });

    const jwt = await createJWT({ id: user.id, email: user.email });

    const responseHeaders = {
      ...corsHeaders,
      'Set-Cookie': `token=${jwt}; Path=/; HttpOnly; SameSite=Lax`,
    };

    return NextResponse.json(
      { 
        success: true, 
        message: "User registered successfully", 
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      {
        status: 201,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email already in use" },
        { 
          status: 409,
          headers: corsHeaders
        }
      );
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders,
    },
  });
}
