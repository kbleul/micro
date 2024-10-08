import Dashboard from "@/app/shared/dashboard/dashboard";

import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Dashboard"),
};

const page = () => {
  return (
      <Dashboard />
  );
};

export default page;
