import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function TaskCardSkeleton() {
  return (
    <Card className="w-full mx-auto shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-foreground">
            All Tasks
          </CardTitle>
          <Button className="gap-2 hover:scale-105 transition-transform">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>
        <Separator className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="p-4 border-l-4 border-l-primary/20 animate-pulse"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                    <div className="h-5 w-48 bg-gray-300 rounded"></div>
                  </div>

                  <div className="ml-8 space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>

                  <div className="flex items-center gap-2 ml-8">
                    <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
