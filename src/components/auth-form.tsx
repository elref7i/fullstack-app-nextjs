"use client";
import { register, signin } from "@/lib/api/api";
import { registerContent, signinContent } from "@/lib/utils/auth-content";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const initial = { email: "", password: "", firstName: "", lastName: "" };

const AuthForm = ({ mode }: { mode: string }) => {
  // Navigation
  const router = useRouter();

  // Themes
  const {theme} = useTheme();

  // Status
  const [formState, setFormState] = useState({ ...initial });

  //  Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "register") {
      await register(formState, router);
    } else {
      await signin(formState, router);
    }
    setFormState(initial);
  };

  //  Check Content
  const content = mode === "register" ? registerContent : signinContent;

  return (
<Card className={cn(theme === "dark" ? "glass-blue" : "", "shadow shadow-gray-200")}>      {/* Header */}
      <CardHeader>
        {/* Title */}
        <CardTitle>
          <h2 className="text-2xl md:text-3xl text-center text-nowrap">
            {content.header}
          </h2>
        </CardTitle>

        {/* Description */}
        <CardDescription>
          <p className="tex-lg text-grey-300 dark:text-grey-50 text-center">
            {content.subheader}
          </p>
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="py-2 space-y-5 md:w-[450px] "
        >
          {mode === "register" && (
            <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-2">
              <div className="space-y-2 flex-1">
                <div className="text-lg ml-2">First Name</div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="text-lg ml-2">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <div className="text-lg ml-2">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <div className="text-lg ml-2">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col  md:flex-row items-center gap-2 justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div className="-order-1 md:order-none w-full md:w-auto">
              <Button
                className="w-full"
                type="submit"
              >
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default AuthForm;
