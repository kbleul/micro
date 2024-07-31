import BranchesList from "@/app/shared/admin/branches/branchesList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Branches"),
};

const page = () => {
  return <BranchesList />;
};

export default page;
