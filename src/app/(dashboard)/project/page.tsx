import { Suspense } from "react";
import ProjectsComponents from "../../../components/projects-components";
import NewProject from "@/components/create-project-modal";
import ProjectsSkeleton from "./_components/project-skeleton";

export default function Page() {
  return (
    <div className="w-full">
      {/* Add new */}
      <div className="flex justify-end">
        <NewProject />
      </div>

      {/* Projects */}
      <div>
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsComponents />
        </Suspense>
      </div>
    </div>
  );
}
