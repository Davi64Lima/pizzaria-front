import { NextResponse } from "next/server";

export const setTokenInCoockies = async (access_token: any) => {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "token",
    value: access_token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  });
};
