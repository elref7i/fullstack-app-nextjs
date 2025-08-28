declare interface ProfileStatsProps {
  userId: string;
}

declare interface Activity {
  description: string;
  timestamp: string;
}

declare interface UserStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  recentActivity: Activity[];
}
