const getEnvVar = (name: string, defaultValue?: string): string => {
  const value = process.env[name] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  // API Configuration
  API_BASE_URL: getEnvVar("NEXT_PUBLIC_API_BASE_URL", "http://localhost:3001"),

  // Auth
  JWT_SECRET: getEnvVar("NEXT_PUBLIC_JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // App Info
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Pizzaria das Irmãs",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",

  // Storage
  STORAGE_URL:
    process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:3001/uploads",

  // Features flags
  IS_DEVELOPMENT: process.env.NODE_ENV !== "production",
  IS_LOCAL: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;
