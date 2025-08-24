"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Calendar, Grid, Settings, User, LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Grid,
  Calendar,
  User,
  Settings,
};

interface SidebarLinksProps {
  link: {
    label: string;
    icon: string;
    link: string;
  };
}

const SidebarLink = ({ link }: SidebarLinksProps) => {
  const pathname = usePathname();
  const isActive = pathname === link.link;

  const Icon = icons[link.icon];

  return (
    <Link
      href={link.link}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent/50 transition-colors"
    >
      <Icon
        size={24}
        className={clsx(
          "transition-colors duration-200",
          isActive
            ? "text-primary stroke-primary"
            : "text-muted-foreground hover:text-primary"
        )}
      />
      <span className="text-xs font-medium hidden lg:block">{link.label}</span>
    </Link>
  );
};

export default SidebarLink;
