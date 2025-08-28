/**
 * Profile Page Component
 *
 * A comprehensive profile page that displays user information and allows
 * users to view and edit their profile details.
 *
 * Features:
 * - Display user information (name, email, join date)
 * - Edit profile functionality
 * - Account statistics
 * - Responsive design
 */

import { Suspense } from "react";
import { redirect } from "next/navigation";
import {} from "@/lib/utils/auth-bcrypt";

import ProfileHeader from "@/app/(dashboard)/profile/_components/profile-header";
import ProfileSkeleton from "@/app/(dashboard)/profile/_components/profile-skeleton";
import ProfileForm from "@/app/(dashboard)/profile/_components/profile-form";
import ProfileStats from "@/app/(dashboard)/profile/_components/profile-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/api/logged-user-api";

export default async function ProfilePage() {
  const user = await getData();

  if (!user) return <ProfileSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and profile information.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Header */}
        <div className="lg:col-span-3">
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <ProfileHeader user={user} />
          </Suspense>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <ProfileForm user={user} />
          </Suspense>
        </div>

        {/* Profile Stats */}
        <div className="lg:col-span-1">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ProfileStats userId={user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
