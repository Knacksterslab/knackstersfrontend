export const appInfo = {
  appName: "Knacksters",
  apiDomain: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "http://localhost:3000",
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth"
};

export const userRoles = {
  CLIENT: "client",
  MANAGER: "manager", 
  TALENT: "talent",
  ADMIN: "admin"
} as const;

export type UserRole = typeof userRoles[keyof typeof userRoles];

export const dashboardPaths: Record<UserRole, string> = {
  [userRoles.CLIENT]: '/client-dashboard',
  [userRoles.MANAGER]: '/manager-dashboard',
  [userRoles.TALENT]: '/talent-dashboard',
  [userRoles.ADMIN]: '/admin-dashboard'
};

export const loginPaths: Record<UserRole, string> = {
  [userRoles.CLIENT]: '/login',
  [userRoles.MANAGER]: '/manager/login',
  [userRoles.TALENT]: '/talent/login',
  [userRoles.ADMIN]: '/admin-dashboard'
};
