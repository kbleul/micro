"use client";

import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import PageHeader from "../../page-header";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { ActivityLogsType } from "types/common_types";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./LogsColumn";
import { Text } from "rizzui";

const LogsList = () => {
  const headers = useGetHeaders({ type: "Json" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pageHeader = {
    title: "Activity Logs",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        name: "Logs",
      },
    ],
  };

  const LogsData = useFetchData(
    [queryKeys.getLogs, currentPage, pageSize],

    `${process.env.NEXT_PUBLIC_BACKEND_URL}audit-logs?page=${currentPage}&page_size=${pageSize}`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    LogsData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }


  const Logs: ActivityLogsType[] = LogsData?.data?.data?.data ?? [];

  return (
    <main>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />


      <WidgetCard
        title={""}
        className={"flex flex-col"}
        headerClassName="widget-card-header border-0 flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        action={
          <section className="mb-4">
            <div className="flex gap-4 justify-start items-center pr-10">
              <div className="flex justify-start items-center gap-4">
                <div className="w-4 h-4 rounded-full border border-green-500" />
                <Text className=" line-clamp-1 capitalize justify-self-center text-green-500 font-semibold">
                  Action
                </Text>
              </div>
    
              <Text className="font-medium text-gray-700 line-clamp-1 capitalize  w-36 border border-gray-200"></Text>
    
              <div className="flex justify-start items-center gap-4">
                <div className="w-4 h-4 rounded-full border border-blue-500" />
                <Text className=" line-clamp-1 capitalize justify-self-center text-blue-500 font-semibold">
                  Entity
                </Text>
              </div>
    
              <Text className="font-medium text-gray-700 line-clamp-1 capitalize  w-36 border border-gray-200"></Text>
    
              <div className="flex justify-start items-center gap-4">
                <div className="w-4 h-4 rounded-full border border-red-500" />
    
                <Text className="line-clamp-1 capitalize justify-self-center text-red-500 font-semibold">
                  By (Usermame / System)
                </Text>
              </div>
            </div>
          </section>}
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={LogsData.isFetching}
            showLoadingText={true}
            data={Logs}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns()}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: LogsData?.data?.data?.total,
              current: currentPage,
              onChange: (page: number) => setCurrentPage(page),
            }}
            className={
              "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
            }
          />
        </div>
      </WidgetCard>
    </main>
  );
};

export default LogsList;
