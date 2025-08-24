import TasksCard from "@/components/task-card";
import React, { Suspense } from "react";
import TasksSkeleton from "./_components/tasks-skeleton";

export default function Page() {
  return (
    <div className="w-full">
      <Suspense fallback={<TasksSkeleton />}>
        <TasksCard />
      </Suspense>
    </div>
  );
}
