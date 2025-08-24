import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export default function TaskCardSkeleton() {
  return (
    <Card className="w-full mx-auto shadow-sm">
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card
              key={index}
              className="p-4 border-l-4 border-l-primary/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-48" />
                  </div>

                  <div className="ml-8 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  <div className="flex items-center gap-2 ml-8">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>

                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
