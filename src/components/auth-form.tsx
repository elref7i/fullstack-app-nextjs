"use client";
import { register, siginin } from "@/lib/api/api";
import { registerContent, signinContent } from "@/lib/utils/auth-content";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";

const intial = { email: "", password: "", firstName: "", lastName: "" };

const AuthForm = ({ mode }: { mode: string }) => {
  // Status
  const [formState, setFormState] = useState({ ...intial });

  //  Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "register") {
      await register(formState);
    } else {
      await siginin(formState);
    }
    setFormState(intial);
  };

  //  Check Content
  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="text-center">
            <h2 className="text-3xl mb-2">{content.header}</h2>
            <p className="tex-lg text-black/25">{content.subheader}</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="py-10 w-full"
          >
            {mode === "register" && (
              <div className="flex mb-8 justify-between">
                <div className="pr-2">
                  <div className="text-lg mb-4 ml-2 text-black/50">
                    First Name
                  </div>
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
                <div className="pl-2">
                  <div className="text-lg mb-4 ml-2 text-black/50">
                    Last Name
                  </div>
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
            <div className="mb-8">
              <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
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
            <div className="mb-8">
              <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
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
            <div className="flex items-center justify-between">
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
              <div>
                <Button type="submit">{content.buttonText}</Button>
              </div>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
export default AuthForm;
