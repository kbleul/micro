import ApprovedLoansList from "@/app/shared/admin/dispures/ApprovedLoansList";
import QueueList from "@/app/shared/admin/queue/QueueList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Loan Dispurse"),
};

const page = () => {
  return <ApprovedLoansList />;
};

export default page;
