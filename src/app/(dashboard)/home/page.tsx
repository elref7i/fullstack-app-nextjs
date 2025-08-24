import { Suspense } from "react";
import Greetings from "./_components/greeting-component";
import GreetingsSkeleton from "./_components/greeting-skeleton";
import ProjectsComponents from "../../../components/projects-components";
import TasksCard from "@/components/task-card";

export default function Page() {
  return (
    <div className="w-full space-y-5 py-5 pr-6">
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
          <Suspense fallback={"...loading"}>
            <TasksCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
