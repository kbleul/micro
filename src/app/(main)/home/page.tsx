import PermissionsList from "@/app/shared/admin/user_settings/permissions/permissionsList";
import Dashboard from "@/app/shared/dashboard/dashboard";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Admin",
  breadcrumb: [
    {
      href: routes.home.dashboard,
      name: "Admin",
    },

    {
      name: "Dashboard",
    },
  ],
};

const page = () => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Dashboard />
      <PermissionsList />
    </>
  );
};

export default page;
