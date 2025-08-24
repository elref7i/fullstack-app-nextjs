import { Button } from "@/components/ui/button";

import Image from "next/image";
import img from "../../../../../public/marketing-manager.png";
import { getData } from "@/lib/api/logged-user-api";

const Greetings = async () => {
  // fetch Data
  const user = await getData();

  return (
    <div className="w-full p-4 sm:p-6 rounded-md relative bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50">
      <div className="mb-4 sm:mb-6">
        {/* Name User */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-foreground font-bold mb-2 sm:mb-4">
          Hello, {user?.firstName}!
        </h1>

        {/* Description  */}
        <h4 className="text-base sm:text-xl text-muted-foreground">
          Check your daily tasks and schedule
        </h4>
      </div>

      {/* Button */}
      <div>
        <Button
          size="lg"
          className="w-full sm:w-auto"
        >
          Today&apos;s Schedule
        </Button>
      </div>

      {/* Image */}
      <Image
        src={img}
        alt="busy person on computer"
        className="w-1/3 sm:w-1/4 absolute hidden sm:block top-0 right-0 opacity-80"
      />
    </div>
  );
};

export default Greetings;
