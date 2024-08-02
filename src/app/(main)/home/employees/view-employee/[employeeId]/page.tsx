import AddBranchForm from "@/app/shared/admin/branches/AddBranchForm";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Branches"),
};

const page = ({ params }: { params: { branchId: string } }) => {
  return <AddBranchForm branchId={params.branchId} />;
};

export default page;
