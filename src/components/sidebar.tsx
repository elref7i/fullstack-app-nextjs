// import Image from "next/image";
import logo from "../../public/logo.png";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import SidebarLink from "./sidebar-links";
import Image from "next/image";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  { label: "Calendar", icon: "Calendar", link: "/project" },
  { label: "Profile", icon: "User", link: "/tasks" },
  { label: "Settings", icon: "Settings", link: "/settings" },
];

const Sidebar = () => {
  return (
    <Card
      className={cn(
        "h-fit sticky order-3 z-40 bottom-3  bg-grey-100  flex justify-center items-center gap-2",
        "md:-left-5 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:order-none"
      )}
    >
      <CardHeader className=" p-0">
        <CardTitle className="text-center">
          <div className="relative size-10  rounded-md md:mb-5">
            <Image
              src={logo}
              alt="Able logo"
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex  md:flex-col p-0 items-center justify-center gap-5">
        {links.map((link) => (
          <SidebarLink
            key={link.link}
            link={link}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default Sidebar;
