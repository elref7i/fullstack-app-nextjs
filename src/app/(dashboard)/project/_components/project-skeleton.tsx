import ProjectCardSkeleton from "@/components/common/skeletons/project-card-skeleton";

export default function ProjectsSkeleton() {
  return (
    <div className="flex flex-2 grow items-center min-h-[80vh] flex-wrap mt-3 -m-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-1/3 p-3"
        >
          <ProjectCardSkeleton />
        </div>
      ))}
    </div>
  );
}
