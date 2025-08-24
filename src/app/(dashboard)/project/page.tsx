import { Suspense } from "react";
import ProjectsComponents from "../../../components/projects-components";
import NewProject from "@/components/create-project-modal";

export default function Page() {
  return (
    <div className="w-full bg-black">
      {/* Add new */}
      <div className="flex justify-end">
        <NewProject />
      </div>

      {/* Projects */}
      <div className=" bg-slate-100">
        <Suspense fallback={"...loading"}>
          <ProjectsComponents />
        </Suspense>
      </div>
    </div>
  );
}
