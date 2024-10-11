export const routes = {
  signIn: "/signin",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  home: {
    dashboard: "/home",
    userSettings: {
      permissions: "/home/user_settings/permissions",
      roles: "/home/user_settings/roles",
      "approval-setup": "/home/user_settings/approval",
    },
    accountSettings: {
      interst_terms: "/home/account_settings/interst_terms",
      account_types: "/home/account_settings/account_types",
      share: "/home/account_settings/share",
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
    members: {
      view_all: "/home/members",
      "add-member": "/home/members/add-member",
      "view-member": (memberId: string) => `/view-member/${memberId}`,
      "view-member-account": (memberId: string, accountId: string) =>
        `/view-member/${memberId}/view-account/${accountId}`,
    },
    users: "/home/users",
    activityLogs: "/home/activity_log",
    approvalRequests: "/home/approval_requests",
    loanQueue: "/home/loan_queue",
    dispurseLoan: "/home/loan_dispurse",
  },
};
