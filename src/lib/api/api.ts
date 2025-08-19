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

export const register = async (user: RegisterForm) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const siginin = async (user: SigninForm) => {
  return fetcher({
    url: "/api/siginin",
    method: "POST",
    body: user,
    json: false,
  });
};
