import AddMemberForm from "@/app/shared/admin/members/AddMemberForm";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Member"),
};

const page = () => {
  return <AddMemberForm />;
};

export default page;
