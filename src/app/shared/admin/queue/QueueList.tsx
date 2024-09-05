"use client";

import React, { useState } from "react";
import { ActionIcon, Button, Input } from "rizzui";
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
import { PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { getColumns } from "./queueColumns";
import { MarriageStatusOptions } from "@/utils/dummy";

const marriageStatusOption = [
  { name: "All", value: "All" },
  ...MarriageStatusOptions,
];

const QueueList = () => {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const { data: session } = useSession();

  const headers = useGetHeaders({ type: "Json" });

  const [searchText, setSearchText] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filterItems, setFilterItems] = useState<{
    marriage_status: string | null;
    monthly_income: number | null;
    current_balance: number | null;
  }>({
    marriage_status: null,
    monthly_income: null,
    current_balance: null,
  });

  const pageHeader = {
    title: "Loan Queue",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        name: "Loan Queue",
      },
    ],
  };

  const getLink = () => {
    let link = `${process.env.NEXT_PUBLIC_BACKEND_URL}loan-applications?page=${currentPage}&perPage=${pageSize}`;

    if (
      filterItems.marriage_status &&
      filterItems.marriage_status !== marriageStatusOption[0].value
    ) {
      link += "&marriage_status=" + filterItems.marriage_status;
    }

    if (filterItems.monthly_income) {
      link += "&monthly_income=" + filterItems.monthly_income;
    }

    if (filterItems.current_balance) {
      link += "&current_balance=" + filterItems.current_balance;
    }

    return link;
  };

  const loansData = useFetchData(
    [queryKeys.getLoanRequests, currentPage, pageSize, searchText, refetch],
    getLink(),

    headers
  );

  const fetchStateHandler = handleFetchState(
    loansData,
    <>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />
      <FilterComponents
        filterItems={filterItems}
        setFilterItems={setFilterItems}
        setRefetch={setRefetch}
      />
    </>
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const LoanApplications = loansData?.data?.data?.loanApplications ?? [];

  return (
    <main>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      <FilterComponents
        filterItems={filterItems}
        setFilterItems={setFilterItems}
        setRefetch={setRefetch}
      />

      <WidgetCard
        title={""}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        action={<></>}
      >
        <div className=" flex items-center justify-end  px-5 py-4 w-1/2 ml-[50%]">
          <Input
            variant="flat"
            value={searchText}
            onChange={(e) => setSearchText(() => e.target.value)}
            placeholder="Search members by name..."
            className=" w-full"
            prefix={
              <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
            }
            suffix={
              searchText && (
                <Button
                  size="sm"
                  variant="text"
                  className="h-auto w-auto px-0"
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchText(() => "");
                  }}
                >
                  Clear
                </Button>
              )
            }
          />
          <ActionIcon
            variant="text"
            size="sm"
            className="ms-3 text-gray-500 hover:text-gray-700"
            onClick={() => {}}
          >
            <PiXBold className="h-5 w-5" />
          </ActionIcon>
        </div>

        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={loansData.isFetching}
            showLoadingText={true}
            data={LoanApplications}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns()}
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

const FilterComponents = ({
  filterItems,
  setFilterItems,
  setRefetch,
}: {
  filterItems: {
    marriage_status: string | null;
    monthly_income: number | null;
    current_balance: number | null;
  };
  setFilterItems: React.Dispatch<
    React.SetStateAction<{
      marriage_status: string | null;
      monthly_income: number | null;
      current_balance: number | null;
    }>
  >;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="border rounded-xl mb-8 p-4">
      <h6 className="text-2xl font-medium">Filters</h6>
      <section className="grid grid-cols-4 items-center gap-10 mt-3">
        <div className="">
          <p>Marriage Status</p>
          <Select
            options={marriageStatusOption}
            isSearchable={true}
            value={
              filterItems.marriage_status
                ? marriageStatusOption.find(
                    (status) => status.value === filterItems.marriage_status
                  )
                : marriageStatusOption[0]
            }
            onChange={(option: any) => {
              setFilterItems((prev) => {
                return { ...prev, marriage_status: option?.value };
              });
            }}
            getOptionLabel={(value: { value: string; name: string }) =>
              value.name
            }
            getOptionValue={(value: { value: string; name: string }) =>
              value.value
            }
            className="font-medium z-[100] w-full mt-1"
            classNamePrefix="react-select"
            isDisabled={false}
            isLoading={false}
            isClearable={true}
          />
        </div>

        <Input
          value={filterItems.monthly_income ? filterItems.monthly_income : ""}
          label="Monthly Income"
          onChange={(e) =>
            setFilterItems((prev: any) => {
              return { ...prev, monthly_income: e.target.value };
            })
          }
          placeholder="Enter number"
          className="bg-white "
          type="number"
        />
        <Input
          value={filterItems.current_balance ? filterItems.current_balance : ""}
          label="Current Balance"
          onChange={(e) =>
            setFilterItems((prev: any) => {
              return { ...prev, current_balance: e.target.value };
            })
          }
          placeholder="Enter number"
          className="bg-white "
          type="number"
        />

        <button
          className="bg-primary-dark hover:bg-primary text-white font-semibold px-5 py-1 text-sm h-fit w-fit"
          type="button"
          onClick={() => setRefetch((prev: boolean) => !prev)}
        >
          Apply
        </button>
      </section>
    </div>
  );
};
export default QueueList;
