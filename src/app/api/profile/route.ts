/**
 * Profile API Route
 *
 * Handles profile update operations including validation
 * and database updates for user information.
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/utils/auth-bcrypt";
import { db } from "@/lib/db";
import { getData } from "@/lib/api/logged-user-api";

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const user = await getUserFromCookie(cookieStore);

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName } = body;

    // Validate input
    if (firstName && typeof firstName !== "string") {
      return NextResponse.json(
        { error: "First name must be a string" },
        { status: 400 }
      );
    }

    if (lastName && typeof lastName !== "string") {
      return NextResponse.json(
        { error: "Last name must be a string" },
        { status: 400 }
      );
    }

    // Update user profile
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: firstName || null,
        lastName: lastName || null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getData();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
