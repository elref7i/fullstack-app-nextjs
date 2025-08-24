import ProjectCard from "@/components/project-card";
import { getProjects } from "@/lib/api/project.api";
import { getData } from "@/lib/api/logged-user-api";
import Link from "next/link";

export default async function ProjectsComponents() {
  const user = await getData();
  const { projects } = await getProjects(user?.id || "");
  console.log(projects);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          Projects
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className="block"
          >
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
}
