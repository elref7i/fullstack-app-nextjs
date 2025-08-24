import Tasks from "@/components/tasks";
import { getSpecificProject } from "@/lib/api/project.api";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getSpecificProject(id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <Suspense fallback={"...loading"}>
        {project && (
          <Tasks
            tasks={project.tasks}
            title={project.name}
          />
        )}
      </Suspense>
    </div>
  );
}
