"use client";

import React, { useState } from "react";
import { ActionIcon, Button, Input } from "rizzui";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Select from "react-select";

import Link from "next/link";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import { getColumns } from "./members_column";
import { toast } from "sonner";
import { handleFetchState } from "@/utils/fetch-state-handler";

const firstBranch = { id: "001-branch", name: "All" };

const MembersList = () => {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const { data: session } = useSession();

  const headers = useGetHeaders({ type: "Json" });

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(
    firstBranch.id
  );

  const pageHeader = {
    title: "Members",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        name: "Members",
      },
    ],
  };

  const usersData = useFetchData(
    [
      queryKeys.getAllMembers,
      currentPage,
      pageSize,
      searchText,
      selectedBranchId,
    ],
    selectedBranchId && selectedBranchId !== "001-branch"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}branches/members/${selectedBranchId}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}members?page=${currentPage}&perPage=${pageSize}`,
    headers
  );

  const Members = usersData?.data?.data?.members ?? [];

  const branchesData = useFetchData(
    [queryKeys.getAllBranches],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}branches`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    branchesData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const changeStatus = async (id: string, currentStatus: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}members/status/${id}`,
        method: "PUT",
        headers,
        body: {
          status:
            currentStatus === "pending" || currentStatus === "rejected"
              ? "approved"
              : "rejected",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllMembers],
          });
          toast.success("Status updated Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const Branches: { id: string; name: string }[] =
    branchesData?.data?.data?.branches ?? [];

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
        action={
          session?.user?.permissions.includes("create:member") && (
            <Link href={routes.home.members["add-member"]}>
              <Button size="lg" color="primary" className="bg-primary-dark">
                Add Member
              </Button>
            </Link>
          )
        }
      >
        <section className="flex justify-between items-center mb-8">
          <div className="flex  gap-x-4">
            <Select
              name={"name"}
              options={[firstBranch, ...Branches]}
              isSearchable={true}
              placeholder="All"
              onChange={(value: any) => {
                setSelectedBranchId(value.id);
              }}
              getOptionLabel={(value: { id: string; name: string }) =>
                value.name
              }
              getOptionValue={(value: { id: string; name: string }) => value.id}
              className="font-medium z-[100] w-[180px]"
              classNamePrefix="react-select"
              isDisabled={false}
              isLoading={false}
              isClearable={true}
            />
          </div>
          <div className=" flex items-center  px-5 py-4 w-1/2">
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
        </section>

        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={usersData.isFetching}
            showLoadingText={true}
            data={Members}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns(changeStatus, session?.user?.permissions)}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: usersData?.data?.data?.total,
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

export default MembersList;
