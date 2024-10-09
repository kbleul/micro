import AddEmployeeForm from "@/app/shared/admin/employees/AddEmployeeForm";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Employee"),
};

const page = ({ params }: { params: { employeeId: string } }) => {
  return <AddEmployeeForm employeeId={params.employeeId} />;
};

export default page;
