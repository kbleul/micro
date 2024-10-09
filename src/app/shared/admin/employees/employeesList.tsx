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
import { handleFetchState } from "@/utils/fetch-state-handler";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import { getColumns } from "./employee_column";
import { roleTypes } from "types/common_types";
import DeletePopover from "@/components/delete-popover";
import { useModal } from "../../modal-views/use-modal";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const firstRole = { id: "001-role", name: "All", slug: "all" };

const EmployeesList = () => {
  const { data: session } = useSession();
  const { openModal, closeModal } = useModal();
  const postMutation = useDynamicMutation();

  const headers = useGetHeaders({ type: "Json" });
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(
    firstRole.name.toLocaleLowerCase()
  );

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
    [
      queryKeys.getAllEmployees,
      selectedRole,
      currentPage,
      pageSize,
      searchText,
    ],
    selectedRole && selectedRole !== "all"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}users/roles/slug/${selectedRole}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}users?page=${currentPage}&perPage=${pageSize}`,
    headers
  );

  const rolesData = useFetchData(
    [queryKeys.getAllRoles],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    rolesData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const Roles: roleTypes[] = rolesData?.data?.data ?? [];

  const handleDelete = async (employeeId: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}users/${employeeId}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllEmployees],
          });

          toast.success("Employee deleted Successfully");
          closeModal();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmployee = (employeeId: string) => {
    openModal({
      view: (
        <DeletePopover
          title="Delete Employee"
          description="Are you sure you want to delete this employee"
          onDelete={() => handleDelete(employeeId)}
        />
      ),
      customSize: "1550px",
    });
  };

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
              <Button
                size="lg"
                color="primary"
                className="bg-primary-dark  text-white"
              >
                Add Employee
              </Button>
            </Link>
          )
        }
      >
        <section className="flex justify-between items-center mb-8">
          <div className="flex  gap-x-4 w-[180px]">
            <Select
              options={[firstRole, ...Roles]}
              isSearchable={true}
              getOptionLabel={(role) => role.name}
              getOptionValue={(role) => role.slug}
              defaultValue={firstRole}
              onChange={(value: any) => setSelectedRole(value.slug)}
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
            columns={getColumns(deleteEmployee)}
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
