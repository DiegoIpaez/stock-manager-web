export const ROUTES = {
  HOME: "/",
};

export const API_ROUTES = {
  USERS: "/users",
};

export const ALL_ROUTES = {
  ...Object.values(ROUTES),
  ...Object.values(API_ROUTES),
};
