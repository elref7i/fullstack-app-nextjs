import ProjectCard from "@/components/project-card";

import { getProjects } from "@/lib/api/project.api";
import Link from "next/link";

export default async function ProjectsComponents() {
  const { projects } = await getProjects();
  console.log(projects);

  return (
    <>
      <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-1/3 p-3"
          >
            <Link href={`/project/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
