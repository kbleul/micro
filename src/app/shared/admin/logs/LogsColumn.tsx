"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { convertDateTimeFormate } from "@/utils/time_manuplation";

export const getColumns = () => [
  {
    title: <HeaderCell title="Actions" />,
    dataIndex: "timestamp",
    key: "timestamp",
    width: 150,
    render: (timestamp: string) => (
      <Text className=" line-clamp-1 capitalize text-gray-700 font-bold text-xs py-3 px-2 border rounded-full text-center ">
        {convertDateTimeFormate(timestamp)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="" />,
    width: 200,
    render: (row: any) => <></>,
  },
  {
    title: <HeaderCell title="" />,
    width: 200,
    render: (row: any) => (
      <div className="flex gap-4 justify-end items-center pr-10">
        <div className="flex justify-start items-center gap-4">
          <div className="w-4 h-4 rounded-full border border-green-500" />
          <Text className=" line-clamp-1 capitalize justify-self-center text-green-500 font-semibold">
            {row?.action_type}
          </Text>
        </div>

        <Text className="font-medium text-gray-700 line-clamp-1 capitalize  w-36 border border-gray-200"></Text>

        <div className="flex justify-start items-center gap-4">
          <div className="w-4 h-4 rounded-full border border-blue-500" />
          <Text className=" line-clamp-1 capitalize justify-self-center text-blue-500 font-semibold">
            {row?.entity}
          </Text>
        </div>

        <Text className="font-medium text-gray-700 line-clamp-1 capitalize  w-36 border border-gray-200"></Text>

        <div className="flex justify-start items-center gap-4">
          <div className="w-4 h-4 rounded-full border border-red-500" />

          <Text className="line-clamp-1 capitalize justify-self-center text-red-500 font-semibold">
            {row?.user_name && row?.username !== "" ? row?.username : "System"}
          </Text>
        </div>
      </div>
    ),
  },
];
