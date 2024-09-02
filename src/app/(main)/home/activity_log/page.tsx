
import LogsList from "@/app/shared/admin/logs/LogsList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Activity Logs"),
};

const page = () => {
  return <LogsList />;
};

export default page;
