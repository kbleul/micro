
import Shares from "@/app/shared/admin/account_settings/Shares";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Dashboard"),
};



const page = () => {
  return (
      <Shares />
  );
};

export default page;
