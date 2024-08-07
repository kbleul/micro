import ViewMember from "@/app/shared/admin/members/ViewMember";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Branches"),
};

const page = ({ params }: { params: { memberId: string } }) => {
  return <ViewMember memberId={params.memberId} />;
};

export default page;
