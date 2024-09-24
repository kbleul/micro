import ViewMemberProfile from "@/app/shared/admin/members/ViewMemberProfile";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Members"),
};

const page = ({ params }: { params: { memberId: string } }) => {
  return <ViewMemberProfile memberId={params.memberId} />;
};

export default page;
