export const routes = {
  signIn: "/signin",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  home: {
    dashboard: "/home",
    userSettings: {
      permissions: "/home/user_settings/permissions",
      roles: "/home/user_settings/roles",
    },
    branches: {
      view_all: "/home/branches",
      "add-branch": "/home/branches/add-branch",
      "view-branch": (branchId: string) =>
        `/home/branches/view-branch/${branchId}`,
    },
    users: "/home/users",
  },
};
