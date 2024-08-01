import AccountTypesList from "@/app/shared/admin/account_settings/AccountTypesList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Dashboard"),
};



const page = () => {
  return (
      <AccountTypesList />
  );
};

export default page;
