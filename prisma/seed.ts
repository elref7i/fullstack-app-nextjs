import { TASK_STATUS } from "@prisma/client";
import { db } from "../src/lib/db";
import { hashPassword } from "@/lib/utils/auth-bcrypt";

const getRandomTaskStatus = () => {
  const statuses = [
    TASK_STATUS.COMPLETED,
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.STARTED,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const user = await db.user.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      firstName: "User",
      lastName: "Person",
      password: await hashPassword("password"),
      projects: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i + 1}`,
          due: new Date(2022, 11, 25),
        })),
      },
    },
    include: {
      projects: true,
    },
  });

  const tasks = await Promise.all(
    user.projects.map((project) =>
      db.task.createMany({
        data: new Array(10).fill(1).map((_, i) => ({
          name: `Task ${i + 1}`,
          ownerId: user.id,
          projectId: project.id,
          description: `Everything that describes Task ${i + 1}`,
          status: getRandomTaskStatus(),
        })),
      })
    )
  );

  console.log("✅ Database seeded!");
  console.log({ user, tasks });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error while seeding:", e);
    await db.$disconnect();
    process.exit(1);
  });
