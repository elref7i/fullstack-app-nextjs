import { Suspense } from "react";
import Greetings from "./_components/greeting-component";
import GreetingsSkeleton from "./_components/greeting-skeleton";
import TasksCard from "@/components/task-card";
import ProjectsComponents from "./_components/projects-components";

export default function Page() {
  return (
    <div className="w-full h-full overflow-y-auto pr-6">
      <div className=" h-full space-y-5 items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        {/* Projects */}

        <div className="space-y-2">
          <Suspense fallback={"...loading"}>
            <ProjectsComponents />
          </Suspense>
        </div>

        {/* Tasks */}
        <div className="w-full">
          <TasksCard />
        </div>
      </div>
    </div>
  );
}
