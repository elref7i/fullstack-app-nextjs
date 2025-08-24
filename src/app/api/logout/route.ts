import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the authentication cookie
    response.cookies.delete(process.env.COOKIE_NAME!);

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
