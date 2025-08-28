/**
 * User Stats API Route
 *
 * Provides user statistics including project counts, task counts,
 * completion rates, and recent activity.
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/utils/auth-bcrypt";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const cookieStore = cookies();
    const user = await getUserFromCookie(cookieStore);

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure users can only access their own stats
    if (user.id !== params.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get user statistics
    const [
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      recentTasks,
      recentProjects,
    ] = await Promise.all([
      // Total projects
      db.project.count({
        where: {
          ownerId: params.userId,
          deleted: false,
        },
      }),

      // Total tasks
      db.task.count({
        where: {
          ownerId: params.userId,
          deleted: false,
        },
      }),

      // Completed tasks
      db.task.count({
        where: {
          ownerId: params.userId,
          status: "COMPLETED",
          deleted: false,
        },
      }),

      // Pending tasks (not started + started)
      db.task.count({
        where: {
          ownerId: params.userId,
          status: {
            in: ["NOT_STARTED", "STARTED"],
          },
          deleted: false,
        },
      }),

      // Recent tasks
      db.task.findMany({
        where: {
          ownerId: params.userId,
          deleted: false,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 5,
        select: {
          id: true,
          name: true,
          status: true,
          updatedAt: true,
        },
      }),

      // Recent projects
      db.project.findMany({
        where: {
          ownerId: params.userId,
          deleted: false,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 3,
        select: {
          id: true,
          name: true,
          updatedAt: true,
        },
      }),
    ]);

    // Calculate completion rate
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Generate recent activity
    const recentActivity = [
      ...recentTasks.map((task) => ({
        type: "task",
        description: `Updated task: ${task.name}`,
        timestamp: task.updatedAt,
      })),
      ...recentProjects.map((project) => ({
        type: "project",
        description: `Updated project: ${project.name}`,
        timestamp: project.updatedAt,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 5)
      .map((activity) => ({
        description: activity.description,
        timestamp: activity.timestamp,
      }));

    return NextResponse.json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      recentActivity,
    });
  } catch (error) {
    console.error("User stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
