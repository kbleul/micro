"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import Image from "next/image";

export const getColumns = () => [
  {
    title: <HeaderCell title="Rank" />,
    width: 150,
    render: (_: string, row: any, index: number) => (
      <div className="flex justify-start pl-1 items-center">
        <Text className="font-medium text-gray-700 line-clamp-1 capitalize w-10 h-10 text-lg bg-gray-100 rounded-full flex justify-center items-center">
          {index + 1}
        </Text>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Photo" />,
    dataIndex: "account",
    key: "account",
    width: 100,
    render: (account: { member: { photo: string } }) => (
      <div>
        {account?.member?.photo && account?.member?.photo !== "" ? (
          <Image
            src={account?.member?.photo}
            alt={""}
            width={45}
            height={45}
            className="rounded-full"
          />
        ) : (
          <div className="rounded-full w-8 h-8 bg-gray-100" />
        )}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Full Name" />,
    dataIndex: "account",
    key: "account",
    width: 200,
    render: (account: { member: { full_name: string } }) => (
      <Text className="font-medium text-gray-700 line-clamp-1 capitalize">
        {account?.member?.full_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Account No." />,
    dataIndex: "account",
    key: "account",
    width: 200,
    render: (account: { number: string }) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 pl-6">
        {account?.number}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Saving Type" />,
    dataIndex: "account",
    key: "account",
    width: 200,
    render: (account: { account_type: { name: string } }) => (
      <Text className="font-medium text-gray-700 line-clamp-1 capitalize">
        {account?.account_type?.name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Amount Asked" />,
    dataIndex: "amount",
    key: "amount",
    render: (amount: string | number) => (
      <Text className="font-medium text-gray-700 tracking-wider">{amount}</Text>
    ),
  },
];
