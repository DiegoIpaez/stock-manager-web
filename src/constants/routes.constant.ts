export const ROUTES = {
  HOME: '/',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_PRODUCTS: '/admin/products',
  LOGIN: '/login',
  PROFILE: '/profile',
};

export const API_ROUTES = {
  USERS: '/users',
  PRODUCTS: '/products',
};

export const ALL_ROUTES = {
  ...Object.values(ROUTES),
  ...Object.values(API_ROUTES),
};
