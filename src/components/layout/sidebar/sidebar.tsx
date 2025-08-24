// import Image from "next/image";
import logo from "../../../../public/logo.png";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SidebarLink from "./sidebar-links";
import Image from "next/image";

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  { label: "Calendar", icon: "Calendar", link: "/project" },
  { label: "Profile", icon: "User", link: "/tasks" },
  { label: "Settings", icon: "Settings", link: "/settings" },
];

const Sidebar = () => {
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
        </CardContent>
      </div>
    </Card>
  );
};

export default Sidebar;
