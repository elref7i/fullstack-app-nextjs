import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/utils/auth-bcrypt";
import { serialize } from "cookie";

export async function POST(request: NextRequest) {
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

      const response = NextResponse.json({}, { status: 201 });

      response.headers.set(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );

      return response;
    } else {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ error: "Signin failed" }, { status: 500 });
  }
}
