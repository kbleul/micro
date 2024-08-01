"use client";

import React, { useState } from "react";
import { ActionIcon, Button, Input, Title } from "rizzui";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Select, { StylesConfig } from "react-select";

import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/shared/modal-views/use-modal";
import PageHeader from "@/app/shared/page-header";
import { useSession } from "next-auth/react";
import { handleFetchState } from "@/utils/fetch-state-handler";
import AddRoleForm from "./AddRoleForm";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import { toast } from "sonner";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import { getColumns } from "./employee_column";
import CustomSelect from "@/components/ui/form/select";
import { CITIES, REGIONS } from "@/utils/dummy";

const EmployeesList = () => {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const { data: session } = useSession();

  const headers = useGetHeaders({ type: "Json" });

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pageHeader = {
    title: "Employees",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        name: "Employees",
      },
    ],
  };

  const usersData = useFetchData(
    [queryKeys.getAllEmployees, currentPage, pageSize, searchText],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}users?page=${currentPage}&perPage=${pageSize}`,
    headers
  );

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
          session?.user?.permissions.includes("create:employee") && (
            <Link href={routes.home.employees["add-employee"]}>
              <Button size="lg" color="primary" className="bg-primary-dark">
                Add Employee
              </Button>
            </Link>
          )
        }
      >
        <section className="flex justify-between items-center mb-8">
          <div className="flex  gap-x-4">
            <Select
              name={"name"}
              options={CITIES}
              isMulti={true}
              isSearchable={true}
              placeholder="All roles"
              onChange={() => {}}
              getOptionLabel={() => ""}
              getOptionValue={() => ""}
              className="w-full font-medium z-[100]"
              classNamePrefix="react-select"
              isDisabled={false}
              isLoading={false}
              isClearable={true}
            />
            {/* <Select
              name={"name"}
              options={CITIES}
              isMulti={true}
              isSearchable={true}
              placeholder="All branches"
              onChange={() => {}}
              getOptionLabel={() => ""}
              getOptionValue={() => ""}
              className="w-full font-medium z-[100]"
              classNamePrefix="react-select"
              isDisabled={false}
              isLoading={false}
              isClearable={true}
            /> */}
          </div>
          <div className=" flex items-center  px-5 py-4 w-1/2">
            <Input
              variant="flat"
              value={searchText}
              onChange={(e) => setSearchText(() => e.target.value)}
              placeholder="Search users by name..."
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
            data={usersData?.data?.data?.users}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns()}
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

export default EmployeesList;
