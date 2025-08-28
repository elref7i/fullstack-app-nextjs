/**
 * Profile Header Component
 *
 * Displays user avatar, name, and basic profile information
 * in a visually appealing header section.
 */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, User } from "lucide-react";
import { formatJoinDate } from "@/lib/utils/date-format";

interface ProfileHeaderProps {
  user: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    createdAt?: Date;
  };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    }
    return user?.email[0].toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    return "User";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <Badge
              variant="secondary"
              className="text-xs"
            >
              Active Member
            </Badge>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{getDisplayName()}</h2>
              <p className="text-muted-foreground">User ID: {user.id}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined:</span>
                <span className="font-medium">
                  {formatJoinDate(user.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
