import { db } from "@/lib/db";
import { validateJWT } from "@/lib/utils/auth-bcrypt";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieValue = req.cookies.get(process.env.COOKIE_NAME!)?.value;
  if (!cookieValue) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await validateJWT(cookieValue);

  const body = await req.json();

  try {
    await db.project.create({
      data: {
        name: body.name,
        description: body.description,
        ownerId: user.id,
      },
    });

    // Revalidate the projects cache
    revalidateTag("projects");

    return NextResponse.json({
      data: { message: "Project created successfully" },
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A project with this name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
