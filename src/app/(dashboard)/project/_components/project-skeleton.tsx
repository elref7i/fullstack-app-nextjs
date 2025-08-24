import ProjectCardSkeleton from "@/components/common/skeletons/project-card-skeleton";

export default function ProjectsSkeleton() {
  return (
    <div className="flex  grow items-center  flex-wrap">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="w-1/4 p-3"
        >
          <ProjectCardSkeleton />
        </div>
      ))}
    </div>
  );
}
