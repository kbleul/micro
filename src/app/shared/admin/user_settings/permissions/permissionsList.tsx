"use client";

import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { HeaderCell } from "@/components/ui/table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { Text } from "rizzui";
import { handleFetchState } from "../../../../../utils/fetch-state-handler";
import { useSession } from "next-auth/react";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import useDynamicMutation from "@/react-query/usePostData";
import { LoginType } from "@/validations/auth.schema";

const PermissionsList = () => {
  const { data: session } = useSession();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const pageHeader = {
    title: session?.user?.user?.roles[0].Name,
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


  // const reportsData: any = useFetchData(
  //   [queryKeys.getAllUsers],
  //   `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}permissions`,
  //   headers
  // );

  // const fetchStateHandler = handleFetchState(reportsData);

  // if (fetchStateHandler) {
  //   return fetchStateHandler;
  // }

  // const PermissionsListData = reportsData.data;



  const handlePost = async () => {
    try {
      // fetch('https://liger-glorious-guppy.ngrok-free.app/api/v1/auth/test', {
      //   method: 'POST',
      //   headers: { "Content-Type": "application/json",
      //     Accept: "application/json",
      //     Authorization: `Bearer ${session?.user.token}`,},
      // })
      // .then(response => response.json())
      // .then(data => console.log(data))
      // .catch(error => console.error('Error:', error));
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}roles`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: {
          email: "admin",
          password: "password"
        },
        onSuccess: (responseData) => {
          console.log(responseData.data)

         



        },
        onError: (err) => {
          console.log(err)
        },
      });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <main>
      <button onClick={() => handlePost()}>Clcik</button>
      {/* <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      <WidgetCard
        title={"Users List"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      >
        <div className={"table-wrapper flex-grow mt-4"}>
          <ControlledTable
            variant={"modern"}
            isLoading={false}
            showLoadingText={true}
            data={PermissionsListData}
            scroll={{ x: 400 }}
            columns={[
              {
                title: <HeaderCell title="Permission" />,
                dataIndex: "permission",
                key: "permission",
                width: 50,
                render: (permission: string) => (
                  <Text className="font-medium text-gray-700">
                    {permission}
                  </Text>
                ),
              },
              {
                title: <HeaderCell title="Slug" />,
                dataIndex: "slug",
                key: "slug",
                width: 50,
                render: (slug: string) => (
                  <Text className="font-medium text-gray-700">{slug}</Text>
                ),
              },
            ]}
            className={
              "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-30 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
            }
          />
        </div>
      </WidgetCard> */}
    </main>
  );
};

export default PermissionsList;
