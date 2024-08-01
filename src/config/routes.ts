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
    employees: {
      view_all: "/home/employees",
      "add-employee": "/home/employees/add-employee",
      "view-employee": (employeeId: string) =>
        `/home/employees/view-employee/${employeeId}`,
    },
    users: "/home/users",
  },
};
