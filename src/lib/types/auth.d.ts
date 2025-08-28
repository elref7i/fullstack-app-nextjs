declare type JwtUser = { id: string; email: string };
declare type MinimalCookies = {
  get: (name: string) => { value: string } | undefined;
};

declare type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

declare type SigninForm = {
  email: string;
  password: string;
};
