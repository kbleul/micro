"use client";

import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";

import React from "react";
import PageHeader from "../../page-header";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";

import LeftSectionProfile from "./LeftSectionProfile";
import RightSectionProfile from "./RightSectionProfile";


const ViewMemberProfile = ({ memberId }: { memberId: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const pageHeader = {
    title: "View Member",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        href: routes.home.members.view_all,
        name: "Members",
      },
      {
        name: "VIew Member",
      },
    ],
  };

  const clientData = useFetchData(
    [queryKeys.getAllUsers + memberId, memberId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}members/${memberId}`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    clientData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const MemberInfo = clientData.data.data;

  return (
    <main className="poppins">
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      <article className="grid grid-cols-1 md:grid-cols-3 border rounded-lg h-[80vh] overflow-hidden">
        <LeftSectionProfile userData={MemberInfo} />

        <RightSectionProfile userData={MemberInfo} />
      </article>
    </main>
  );
};

export default ViewMemberProfile;
