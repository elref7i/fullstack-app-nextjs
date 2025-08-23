import { Button } from "@/components/ui/button";

import Image from "next/image";
import img from "../../../../../public/marketing-manager.png";
import { getData } from "@/lib/api/logged-user-api";

const Greetings = async () => {
  // fetch Data
  const user = await getData();

  return (
    <div className="w-full -z-10  p-6 rounded-md relative bg-gray-300">
      <div className="mb-4">
        {/* Name User */}
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user?.firstName}!
        </h1>

        {/* Description  */}
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>

      {/* Button */}
      <div>
        <Button size="lg">Today&apos;s Schedule</Button>
      </div>

      {/* Image */}
      <Image
        src={img}
        alt="busy person on computer"
        className="w-1/4 -z-10 absolute hidden sm:block top-[0px] lg:top-[-30px] right-0"
      />
    </div>
  );
};

export default Greetings;
