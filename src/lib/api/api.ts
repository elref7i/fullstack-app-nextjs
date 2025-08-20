import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface FetcherType<TBody = unknown> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TBody;
  json?: boolean;
}

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
