import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { revalidateTag } from "next/cache";

interface FetcherType<TBody = unknown> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TBody;
  json?: boolean;
}

// Fetcher
export const fetcher = async <TBody = unknown>({
  url,
  method,
  body,
  json = true,
}: FetcherType<TBody>): Promise<unknown> => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  if (json) {
    const payload = await res.json();
    return payload.data; // strong typing
  }

  return {};
};

//  Register
export const register = async (
  user: RegisterForm,
  router: AppRouterInstance
) => {
  try {
    await fetcher({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
      method: "POST",
      body: user,
      json: false,
    });
    toast.success("User registered successfully!");
    router.push("/signin");
  } catch (error) {
    console.error(error);

    toast.error("Something went wrong, please try again." + error);
  }
};

// Sign in
export const signin = async (user: SigninForm, router: AppRouterInstance) => {
  try {
    await fetcher({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/signin`,
      method: "POST",
      body: user,
      json: false,
    });
    toast.success("Login successful ✅");
    router.push("/home");
  } catch (error) {
    console.error(error);
    toast.error("Login failed ❌");
  }
};

//  Create New Project
export const createNewPorject = async (projectData: {
  name: string;
  description?: string;
}) => {
  try {
    await fetcher({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/project`,
      method: "POST",
      body: projectData,
      json: true,
    });
    toast.success("successful ✅");
    revalidateTag("projects");
  } catch (error) {
    console.error(error);
    toast.error("failed ❌");
  }
};

// Logout
export const logout = async (router: AppRouterInstance) => {
  try {
    await fetcher({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
      method: "POST",
      json: false,
    });
    toast.success("Logged out successfully");
    router.push("/signin");
  } catch (error) {
    console.error(error);
    toast.error("Logout failed");
  }
};
