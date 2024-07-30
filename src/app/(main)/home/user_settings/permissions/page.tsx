import PermissionsList from "@/app/shared/admin/user_settings/permissions/permissionsList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Permissions"),
};

const page = () => {
  return <PermissionsList />;
};

export default page;
