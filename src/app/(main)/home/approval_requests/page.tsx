
import RequestsList from "@/app/shared/admin/approval_requests/requestsList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Approval Requests"),
};

const page = () => {
  return <RequestsList />;
};

export default page;
