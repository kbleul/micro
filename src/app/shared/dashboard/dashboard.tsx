"use client";

import React from "react";
import StatCards from "./stat-cards";
import { routes } from "@/config/routes";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import PageHeader from "../page-header";
import { handleFetchState } from "@/utils/fetch-state-handler";
import CustomPieChart from "./PieChartGender";
import CustomLineChart from "./CustomLineChart";
import CustomPieChartAccount from "./PieChartAccount";
import CustomLineChartSaving from "./CustomLineChartSaving";

const Dashboard = () => {
  const headers = useGetHeaders({ type: "Json" });

  const pageHeader = {
    title: "Dashboard",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Admin",
      },
  
      {
        name: "Dashboard",
      },
    ],
  };

  const analyticsData = useFetchData(
    [queryKeys.getAnalytics],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}reports`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    analyticsData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  console.log( analyticsData?.data?.data)
  const analytics: any = analyticsData?.data?.data ?? null;

  return (
    <div className="@container">
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <StatCards className="col-span-full @2xl:grid-cols-3 @6xl:grid-cols-4" analytics={analytics} />
      </div>


      <article className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-8 w-full items-stretch mt-10">
        <CustomPieChart analytics={analytics?.gender_distribution} />
        <CustomPieChartAccount analytics={analytics?.account_type_usage} />

        <CustomLineChart analytics={analytics?.savings_status_distribution} />
        <CustomLineChartSaving analytics={analytics?.members_grouped_by_branch} />

        
      </article>
    </div>
  );
};

export default Dashboard;
