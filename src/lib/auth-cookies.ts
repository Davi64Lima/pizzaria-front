"use server";

import { cookies } from "next/headers";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

const TOKEN_NAME = "auth-token";
const REFRESH_TOKEN_NAME = "refresh-token";
const USER_DATA_NAME = "user-data";

export async function setAuthCookies(
  accessToken: string,
  refreshToken?: string,
  userData?: UserData
) {
  const cookieStore = await cookies();

  // Set access token (1 day)
  cookieStore.set(TOKEN_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 1 day
    path: "/",
  });

  // Set refresh token (7 days)
  if (refreshToken) {
    cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
  }

  // Set user data (encoded as JSON)
  if (userData) {
    cookieStore.set(USER_DATA_NAME, JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
  }
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_NAME)?.value;
}

export async function getUserData(): Promise<UserData | null> {
  const cookieStore = await cookies();
  const userData = cookieStore.get(USER_DATA_NAME)?.value;

  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  return null;
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(TOKEN_NAME);
  cookieStore.delete(REFRESH_TOKEN_NAME);
  cookieStore.delete(USER_DATA_NAME);
}

export async function refreshAuthTokens(
  newAccessToken: string,
  newRefreshToken?: string
) {
  const cookieStore = await cookies();

  // Update access token
  cookieStore.set(TOKEN_NAME, newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 1 day
    path: "/",
  });

  // Update refresh token if provided
  if (newRefreshToken) {
    cookieStore.set(REFRESH_TOKEN_NAME, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
  }
}
