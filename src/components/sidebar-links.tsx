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
      className="w-ful"
    >
      <Icon
        size={30}
        className={clsx(
          "stroke-gray-50  hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
