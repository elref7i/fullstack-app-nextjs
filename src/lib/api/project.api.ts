/**
 * Project API Functions
 *
 * This module provides database operations for projects and tasks.
 * It includes cached versions for better performance and real-time updates.
 *
 * Features:
 * - Cached data fetching with automatic revalidation
 * - User-specific data filtering
 * - Optimized database queries with Prisma
 */

import { TASK_STATUS } from "@prisma/client";
import { db } from "../db";
import { getData } from "./logged-user-api";
import { unstable_cache } from "next/cache";

/**
 * Get User Projects (Cached)
 *
 * Retrieves all projects for a specific user with their associated tasks.
 * Uses Next.js caching for improved performance.
 *
 * @param userId - The ID of the user whose projects to fetch
 * @returns Promise with projects data including tasks
 */
export const getProjects = unstable_cache(
  async (userId: string) => {
    const projects = await db.project.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        tasks: true, // Include related tasks for progress calculation
      },
    });

    return { projects };
  },
  ["user-projects"], // Cache key
  {
    tags: ["projects"], // Cache tag for revalidation
    revalidate: false, // Manual revalidation only
  }
);

// Cached version for tasks
export const getTasks = unstable_cache(
  async (userId: string) => {
    const tasks = await db.task.findMany({
      where: {
        ownerId: userId,
        NOT: {
          status: TASK_STATUS.COMPLETED,
          deleted: false,
        },
      },
      take: 5,
      orderBy: {
        due: "asc",
      },
    });

    return tasks;
  },
  ["user-tasks"],
  {
    tags: ["tasks"],
    revalidate: false,
  }
);

// Specific Project
export const getSpecificProject = async (id: string) => {
  const user = await getData();

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};
