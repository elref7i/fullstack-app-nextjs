declare type JwtUser = { id: string; email: string };
declare type MinimalCookies = {
  get: (name: string) => { value: string } | undefined;
};
