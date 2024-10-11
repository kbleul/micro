"use client";

import React, { useState } from "react";
import { Input } from "rizzui";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Select from "react-select";

import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { getColumns } from "./loanColumns";
import { toast } from "sonner";

const ApprovedLoansList = () => {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();


  const headers = useGetHeaders({ type: "Json" });



  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const pageHeader = {
    title: "Dispurse Loan",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        name: "Dispurse Loan",
      },
    ],
  };



  const loansData = useFetchData(
    [queryKeys.getLoanRequests, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}loan-applications/loans?status=approved`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    loansData,
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />
    
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const LoanApplications = loansData?.data?.data?.loan_applications ?? [];
  const handleDispurse = async (loanApplicationId: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}loan-applications/${loanApplicationId}/disburse`,
        method: "POST",
        headers,
        body: {
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getLoanRequests],
          });

          toast.success("Loan dispursed Successfully");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

    
      <WidgetCard
        title={""}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        action={<></>}
      >
     

        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={loansData.isFetching}
            showLoadingText={true}
            data={LoanApplications}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns(handleDispurse, postMutation.isPending)}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: loansData?.data?.data?.total,
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


export default ApprovedLoansList;
