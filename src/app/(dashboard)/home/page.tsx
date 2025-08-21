import { Suspense } from "react";
import Greetings from "./_components/greeting-component";
import GreetingsSkeleton from "./_components/greeting-skeleton";
import ProjectCard from "@/components/project-card";

export default function Page() {
  return (
    <div className="w-full h-full  overflow-y-auto pr-6">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>

        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {/* {projects.map((project) => (
            <div className="w-1/3 p-3">
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))} */}
          <div className="w-1/3 p-3">{/* <NewProject /> */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">{/* <TasksCard /> */}</div>
        </div>
      </div>
    </div>
  );
}
