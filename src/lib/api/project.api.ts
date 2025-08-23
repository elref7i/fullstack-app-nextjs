import { TASK_STATUS } from "@prisma/client";
import { db } from "../db";
import { getData } from "./logged-user-api";

export const getProjects = async () => {
  const user = await getData();

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

export const getTasks = async () => {
  const user = await getData();

  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
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
};
