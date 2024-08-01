import AddEmployeeForm from "@/app/shared/admin/employees/AddEmployeeForm";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Employees"),
};

const page = () => {
  return <AddEmployeeForm />;
};

export default page;
