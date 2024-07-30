"use client";

import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import Loading from "@/components/ui/Loading";
import { HeaderCell } from "@/components/ui/table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { Text } from "rizzui";
import {handleFetchState} from "../../../../utils/fetch-state-handler"


const UsersList = () => {

  
    const headers = useGetHeaders({ type: "Json" });
  
    const reportsData:any = useFetchData(
      [queryKeys.getAllUsers],
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}users/users`,
      headers
    );

    const fetchStateHandler = handleFetchState(reportsData);

    if (fetchStateHandler) {
      return fetchStateHandler;
    }
   
    const usersListData = reportsData.data    



  return (
    <main>
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
          data={usersListData}
          scroll={{ x: 900 }}
          columns={[
            {
              title: <HeaderCell title="Username" />,
              dataIndex: "username",
              key: "username",
              width: 50,
              render: (username: string) => (
                <Text className="font-medium text-gray-700">{username}</Text>
              ),
            },
            {
              title: <HeaderCell title="Email" />,
              dataIndex: "email",
              key: "email",
              width: 50,
              render: (email: string) => (
                <Text className="font-medium text-gray-700">{email}</Text>
              ),
            },
            {
              title: <HeaderCell title="Role" />,
              dataIndex: "roles",
              key: "roles",
              width: 50,
              render: (roles: {id: string, name: string}[] ) => (
                <div className="">
                {roles.map(role => 
                <Text key={role.id} className="font-medium text-gray-700">{role.name}</Text>

                )}
                    </div>
                
              ),
            }
          ]}
          className={
            "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-30 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          }
        />
      </div>
    </WidgetCard>
  </main>
  )
}

export default UsersList
