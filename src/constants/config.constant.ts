const NEXTAUTH = {
  URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  SECRET: process.env.NEXTAUTH_SECRET || "secret",
};

const S3_CONFIG = {
  REGION: process.env.S3_REGION || "",
  ENDPOINT: process.env.S3_ENDPOINT || "",
  ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || "",
  SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || "",
  BUCKET_NAME: process.env.S3_BUCKET_NAME || "",
};

export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "development",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  NEXTAUTH,
  S3: S3_CONFIG,
};
