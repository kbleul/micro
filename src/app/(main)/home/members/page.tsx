import MembersList from "@/app/shared/admin/members/membersList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Members"),
};

const page = () => {
  return <MembersList />;
};

export default page;
