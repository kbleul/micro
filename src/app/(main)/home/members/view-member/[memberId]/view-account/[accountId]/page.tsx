import ViewMember from "@/app/shared/admin/members/ViewMember";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Member Accounts"),
};

const page = () => {
  return <ViewMember  />;
};

export default page;
