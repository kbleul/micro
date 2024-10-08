"use client";

import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { HeaderCell } from "@/components/ui/table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { Button, Text } from "rizzui";
import { handleFetchState } from "../../../../../utils/fetch-state-handler";
import { useSession } from "next-auth/react";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import { useModal } from "@/app/shared/modal-views/use-modal";
import AddPermissionForm from "./AddPermissionForm";
import { convertDateTimeFormate } from "@/utils/time_manuplation";

const PermissionsList = () => {
  const { data: session } = useSession();
  const headers = useGetHeaders({ type: "Json" });

  const { openModal } = useModal();

  const pageHeader = {
    title: "Permissions",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        name: "User Settings",
      },
      {
        name: "Permissions",
      },
    ],
  };

  const permissionssData: any = useFetchData(
    [queryKeys.getAllPermissions],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user-permissions`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    permissionssData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const PermissionsListData = permissionssData?.data?.data;
  return (
    <main>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      {PermissionsListData && (
        <WidgetCard
          title={"Permissions List"}
          className={"flex flex-col"}
          headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
          action={
            session?.user?.permissions &&
            session?.user?.permissions.includes("create:permission") && (
              <Button
                size="lg"
                color="primary"
                className="bg-primary-dark"
                onClick={() =>
                  openModal({
                    view: <AddPermissionForm />,
                  })
                }
              >
                Add Permission
              </Button>
            )
          }
        >
          <div className={"table-wrapper flex-grow mt-4"}>
            <ControlledTable
              variant={"modern"}
              isLoading={false}
              showLoadingText={true}
              data={PermissionsListData}
              scroll={{ x: 40 }}
              columns={[
                {
                  title: <HeaderCell title="Permission" />,
                  dataIndex: "name",
                  key: "name",
                  width: 10,
                  render: (name: string) => (
                    <Text className="font-medium text-gray-700">{name}</Text>
                  ),
                },
                {
                  title: <HeaderCell title="Slug" />,
                  dataIndex: "slug",
                  key: "slug",
                  width: 10,
                  render: (slug: string) => (
                    <Text className="font-medium text-gray-700">{slug}</Text>
                  ),
                },
                {
                  title: <HeaderCell title="Created At" />,
                  dataIndex: "claimable",
                  key: "claimable",
                  width: 10,
                  render: (created_at: string) => (
                    <Text className="text-sm text-gray-700">
                      {convertDateTimeFormate(created_at)}
                    </Text>
                  ),
                },
              ]}
              className={
                "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-30 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
              }
            />
          </div>
        </WidgetCard>
      )}
    </main>
  );
};

export default PermissionsList;
