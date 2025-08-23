import { getUserFromCookie } from "@/lib/utils/auth-bcrypt";
import { cookies } from "next/headers";

export const getData = async () => {
  const user = await getUserFromCookie(cookies());
  return user;
};
