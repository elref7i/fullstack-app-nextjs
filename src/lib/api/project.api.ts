import { TASK_STATUS } from "@prisma/client";
import { db } from "../db";
import { getData } from "./logged-user-api";
import { unstable_cache } from "next/cache";

// Cached version with revalidation
export const getProjects = unstable_cache(
  async (userId: string) => {
    const projects = await db.project.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        tasks: true,
      },
    });

    return { projects };
  },
  ["user-projects"],
  {
    tags: ["projects"],
    revalidate: false,
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
