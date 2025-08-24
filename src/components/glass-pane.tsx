"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";

const GlassPane = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  // Theme
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        theme === "light" ? "glass-blue" : "glass-clear",
        "rounded-2xl border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
