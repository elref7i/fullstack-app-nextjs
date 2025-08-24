import React from "react";

import { Card } from "./ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { TASK_STATUS } from "@prisma/client";

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

interface TasksCardProps {
  task: Task;
}

const getStatusConfig = (status: TASK_STATUS) => {
  switch (status) {
    case TASK_STATUS.COMPLETED:
      return {
        icon: CheckCircle2,
        color: "bg-primary text-primary-foreground",
        label: "Completed",
      };
    case TASK_STATUS.STARTED:
      return {
        icon: Clock,
        color: "bg-secondary text-secondary-foreground",
        label: "In Progress",
      };
    default:
      return {
        icon: Circle,
        color: "bg-muted text-muted-foreground",
        label: "Pending",
      };
  }
};

export default async function TasksCard({ task }: TasksCardProps) {
  const statusConfig = getStatusConfig(task.status);
  const StatusIcon = statusConfig.icon;
  return (
    <Card
      key={task.id}
      className="p-3 sm:p-4 hover:shadow-md transition-shadow border-l-4 border-l-primary/20"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <h3 className="font-semibold text-card-foreground text-sm sm:text-base line-clamp-2">
              {task.name}
            </h3>
          </div>

          {task.description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed ml-6 sm:ml-8 line-clamp-2">
              {task.description}
            </p>
          )}

          {task.due && (
            <div className="flex items-center gap-2 ml-6 sm:ml-8">
              <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground italic">
                Due: {new Date(task.due).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <Badge
          variant="secondary"
          className={`${statusConfig.color} text-xs font-medium flex-shrink-0`}
        >
          {statusConfig.label}
        </Badge>
      </div>
    </Card>
  );
}
