import RolesList from "@/app/shared/admin/user_settings/roles/rolesList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Roles"),
};

const page = () => {
  return <RolesList />;
};

export default page;
