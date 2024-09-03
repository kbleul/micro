

import ApprovalPresetup from "@/app/shared/admin/user_settings/approval/ApprovalPresetup";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Approval Setup"),
};

const page = () => {
  return <ApprovalPresetup />;
};

export default page;
