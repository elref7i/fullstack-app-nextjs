import TasksCard from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getTasks } from "@/lib/api/project.api";
import { TASK_STATUS } from "@prisma/client";
import { Circle, Plus } from "lucide-react";

interface Task {
  id: string;
  name: string;
  description: string | null;
  status: TASK_STATUS;
  due: Date | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  projectId: string;
  deleted: boolean;
}

interface TasksProps {
  tasks?: Task[];
  title?: string;
}
export default async function Tasks({ tasks, title }: TasksProps) {
  const data = tasks || (await getTasks());
  return (
    <Card className="w-full mx-auto shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">
            {title || "All Tasks"}
          </CardTitle>
          <Button className="gap-2 hover:scale-105 transition-transform w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>
        <Separator className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-4">
        {data && data.length ? (
          <div className="space-y-4">
            {data.map((task) => (
              <TasksCard
                key={task.id}
                task={task}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Circle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No tasks yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first task
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Task
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
