/**
 * Sidebar Navigation Component
 *
 * Responsive navigation sidebar that adapts to mobile and desktop layouts.
 * Provides navigation links and user menu functionality.
 *
 * Features:
 * - Mobile: Bottom navigation bar
 * - Desktop: Vertical sidebar with logo
 * - User menu integration
 * - Responsive design
 */

import logo from "../../../../public/logo.png";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SidebarLink from "./sidebar-links";
import Image from "next/image";
import UserMenu from "@/components/user-menu";
import { getData } from "@/lib/api/logged-user-api";

// Navigation links configuration
const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  { label: "Project", icon: "SquareDashedKanban", link: "/project" },
  { label: "Tasks", icon: "ClipboardList", link: "/tasks" },
];

const Sidebar = async () => {
  const user = await getData();
  return (
    <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
      {/* Mobile: Bottom navigation */}
      <div className="lg:hidden">
        <CardContent className="flex justify-around items-center p-3 gap-2">
          {links.map((link) => (
            <SidebarLink
              key={link.link}
              link={link}
            />
          ))}
          <UserMenu user={user || undefined} />
        </CardContent>
      </div>

      {/* Desktop: Side navigation */}
      <div className="hidden lg:flex lg:flex-col items-center lg:w-16 lg:h-fit lg:sticky lg:top-4">
        <CardHeader className="pb-2  flex justify-center">
          <CardTitle className="text-center ">
            <div className="relative w-10 h-10 rounded-md mx-auto">
              <Image
                src={logo}
                alt="Able logo"
                priority
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-2 gap-4">
          {links.map((link) => (
            <SidebarLink
              key={link.link}
              link={link}
            />
          ))}
          <div className="pt-4 border-t border-border/50">
            {/* <LogoutButton
              variant="ghost"
              size="icon"
              className="w-full h-10"
            /> */}
            <UserMenu user={user || undefined} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Sidebar;
