const NEXTAUTH = {
  URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  SECRET: process.env.NEXTAUTH_SECRET || 'secret',
};

export const CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  NEXTAUTH,
};
