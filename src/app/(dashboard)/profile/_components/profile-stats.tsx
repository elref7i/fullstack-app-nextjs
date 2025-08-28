/**
 * Profile Stats Component
 *
 * Displays user statistics including total projects, tasks,
 * and completion rates in a visually appealing card layout.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, TrendingUp, Calendar, Target } from "lucide-react";
import { getUserStats } from "@/lib/api/api";

export default async function ProfileStats({ userId }: ProfileStatsProps) {
  // Fetch Data
  const stats = await getUserStats<UserStats>(userId);

  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  return (
    <div className="space-y-4">
      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overview
          </CardTitle>
          <CardDescription>
            Your activity summary and performance metrics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.totalProjects}
              </div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.totalTasks}
              </div>
              <div className="text-xs text-muted-foreground">Total Tasks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Task Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Completed</span>
              </div>
              <Badge variant="secondary">{stats.completedTasks}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Pending</span>
              </div>
              <Badge variant="secondary">{stats.pendingTasks}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Completion Rate</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            <Progress
              value={completionRate}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity
                .slice(0, 3)
                .map((activity: Activity, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">
                      {activity.description}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              No recent activity
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
