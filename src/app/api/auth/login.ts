import { cookies } from "next/headers";

export const setTokenInCoockies = async (access_token: any) => {
  (await cookies()).set({
    name: "token",
    value: access_token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  });
};
