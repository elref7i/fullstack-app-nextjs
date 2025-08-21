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

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  { label: "Calendar", icon: "Calendar", link: "/Project" },
  { label: "Profile", icon: "User", link: "/profile" },
  { label: "Settings", icon: "Settings", link: "/settings" },
];

const Sidebar = () => {
  return (
    <Card className="py-5 px-5 h-fit flex gap-5  md:block order-1 items-center justify-center md:order-none">
      <CardHeader className=" p-0">
        <CardTitle className="text-center">
          <div className="relative size-16 rounded-md md:mb-5 flex justify-center items-center gap-2">
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
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};

export default Sidebar;
