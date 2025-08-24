import TasksCard from "@/components/task-card";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-full">
      <Suspense fallback={"...loading"}>
        <TasksCard />
      </Suspense>
    </div>
  );
}
