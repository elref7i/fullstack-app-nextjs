import { formatDate } from "@/lib/utils/date-format";
import { Prisma, TASK_STATUS } from "@prisma/client";
import { FC } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Calendar, CheckCircle2, Circle } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

//  Project
export const projectWithTasks = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: { tasks: true },
});

// Types
type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  // Completed Tasks
  const completedCount = project.tasks.filter(
    (task) => task.status === TASK_STATUS.COMPLETED
  ).length;

  // Total Task
  const totalTasks = project.tasks.length;

  // Progress Value
  const progress: number =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(project.createdAt)}</span>
          </div>
          <Badge
            variant="secondary"
            className="bg-secondary/20 text-secondary-foreground"
          >
            {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {project.name}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              <span className="font-medium text-card-foreground">
                {completedCount}
              </span>{" "}
              of{" "}
              <span className="font-medium text-card-foreground">
                {totalTasks}
              </span>{" "}
              completed
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 text-chart-1" />
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Progress
            value={progress}
            className="h-2 bg-muted"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium">{progress}% complete</span>
          </div>
        </div>

        {totalTasks > 0 && (
          <div className="flex items-center gap-4 pt-2 border-t border-border">
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">
                Completed: {completedCount}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
              <span className="text-muted-foreground">
                Remaining: {totalTasks - completedCount}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
