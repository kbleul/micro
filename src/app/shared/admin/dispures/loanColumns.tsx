"use client";

import Spinner from "@/components/ui/spinner";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { convertDateTimeFormate } from "@/utils/time_manuplation";
import Image from "next/image";

export const getColumns = (
  handleDispurse: (loanApplicationId: string) => {},
  isLoading: boolean
) => [
  {
    title: <HeaderCell title="Photo" />,
    dataIndex: "account",
    key: "account",
    width: 50,
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
    width: 100,
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
    width: 100,
    render: (account: { number: string }) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 ">
        {account?.number}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Amount" />,
    dataIndex: "amount",
    key: "amount",
    width: 100,
    render: (amount: string | number) => (
      <Text className="font-medium text-gray-700 tracking-wider">{amount}</Text>
    ),
  },
  {
    title: <HeaderCell title="Saving Type" />,
    dataIndex: "account",
    key: "account",
    width: 120,
    render: (account: { account_type: { name: string } }) => (
      <Text className="font-medium text-gray-700 line-clamp-1 capitalize">
        {account?.account_type?.name}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Approved On" />,
    dataIndex: "updated_at",
    key: "updated_at",
    width: 120,

    render: (updated_at: string) => (
      <Text className="font-medium text-gray-700 tracking-wider text-sm">
        {convertDateTimeFormate(updated_at).split(", ")[1]}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="" />,
    width: 100,
    render: (row: any) => (
      <div className="flex justify-center items-center">
        <button
          className="px-6 py-2 rounded-lg bg-primary-dark text-white min-w-[7rem] font-semibold text-center capitalize hover:bg-black flex justify-center items-center"
          onClick={() => handleDispurse(row.id)}
          disabled={isLoading}
        >
         {isLoading ?  <Spinner className="w-4 h-4 text-white" /> :  "Dispurse"}
        </button>
      </div>
    ),
  },
];
