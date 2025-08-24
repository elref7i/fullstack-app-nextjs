import { Suspense } from "react";
import Greetings from "./_components/greeting-component";
import GreetingsSkeleton from "./_components/greeting-skeleton";
import ProjectsComponents from "../../../components/projects-components";
import Tasks from "@/components/tasks";
import ProjectsSkeleton from "../project/_components/project-skeleton";
import TasksSkeleton from "../tasks/_components/tasks-skeleton";

export default function Page() {
  return (
    <div className="w-full space-y-4 sm:space-y-6 py-4 sm:py-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Greetings */}
        <div className="flex-1">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>

        {/* Projects */}
        <div className="space-y-3">
          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectsComponents />
          </Suspense>
        </div>

        {/* Tasks */}
        <div className="w-full">
          <Suspense fallback={<TasksSkeleton />}>
            <Tasks />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
