// Funções para client-side
export const setCookieClient = (
  name: string,
  value: string,
  days: number = 7
) => {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;
};

export const getCookieClient = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookieClient = (name: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Utilitários específicos para tokens
export const TOKEN_COOKIE_NAME = "auth_token";
export const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

export const setAuthTokens = (accessToken: string, refreshToken?: string) => {
  setCookieClient(TOKEN_COOKIE_NAME, accessToken, 1); // 1 dia
  if (refreshToken) {
    setCookieClient(REFRESH_TOKEN_COOKIE_NAME, refreshToken, 7); // 7 dias
  }
};

export const getAuthToken = (): string | null => {
  return getCookieClient(TOKEN_COOKIE_NAME);
};

export const getRefreshToken = (): string | null => {
  return getCookieClient(REFRESH_TOKEN_COOKIE_NAME);
};

export const clearAuthTokens = () => {
  deleteCookieClient(TOKEN_COOKIE_NAME);
  deleteCookieClient(REFRESH_TOKEN_COOKIE_NAME);
};
