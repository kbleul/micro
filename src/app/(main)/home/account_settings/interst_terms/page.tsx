import IntrestTermsList from "@/app/shared/admin/account_settings/IntrestTermsList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Dashboard"),
};



const page = () => {
  return (
      <IntrestTermsList />
  );
};

export default page;
