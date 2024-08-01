import EmployeesList from "@/app/shared/admin/employees/employeesList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Employees"),
};

const page = () => {
  return <EmployeesList />;
};

export default page;
