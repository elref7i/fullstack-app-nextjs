// import Image from "next/image";
// import logo from "@/assets/images/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import SidebarLink from "./sidebar-links";

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  { label: "Calendar", icon: "Calendar", link: "/calendar" },
  { label: "Profile", icon: "User", link: "/profile" },
  { label: "Settings", icon: "Settings", link: "/settings" },
];

const Sidebar = () => {
  return (
    <Card className="py-5">
      <CardHeader>
        <CardTitle className="text-center">Card Title</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-center items-center gap-2">
          {/* <Image
          src={logo}
          alt="Able logo"
          priority
          className="w-14"
        /> */}
        </div>
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
