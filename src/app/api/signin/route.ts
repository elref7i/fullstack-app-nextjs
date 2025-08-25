import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/utils/auth-bcrypt";

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

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    const user = await db.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { 
          status: 401,
          headers: corsHeaders
        }
      );
    }

    const isValidPassword = await comparePasswords(
      body.password,
      user.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { 
          status: 401,
          headers: corsHeaders
        }
      );
    }

    const jwt = await createJWT({ id: user.id, email: user.email });

    const responseHeaders = {
      ...corsHeaders,
      'Set-Cookie': `token=${jwt}; Path=/; HttpOnly; SameSite=Lax`,
    };

    const response = NextResponse.json(
      {
        success: true,
        message: "Signed in successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      {
        status: 200,
        headers: responseHeaders,
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Signin failed" }, { status: 500 });
  }
}
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
