"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import Image from "next/image";
import { IoToggleSharp } from "react-icons/io5";
import { RiToggleLine } from "react-icons/ri";
import { TbEye } from "react-icons/tb";
import Link from "next/link";
import { routes } from "@/config/routes";
import { ActionIcon } from "rizzui";
import DropDown from "./DropDown";

export const getColumns = (
  changeStatus: (id: number, currentStatus: string) => void,
  permissions: string[]
) => [
  {
    title: <HeaderCell title="Photo" />,
    dataIndex: "photo",
    key: "photo",
    width: 80,
    render: (photo: string | null | undefined) => (
      <div>
        {photo && photo !== "" ? (
          <Image
            src={photo}
            alt={""}
            width={45}
            height={45}
            className="rounded-full w-10 h-10 overflow-hidden"
          />
        ) : (
          <div className="rounded-full w-8 h-8 bg-gray-100 overflow-hidden" />
        )}
      </div>
    ),
  },

  {
    title: <HeaderCell title="Full Name" />,
    dataIndex: "full_name",
    key: "full_name",
    width: 200,
    render: (full_name: string) => (
      <Text className="font-medium text-gray-700 line-clamp-1 capitalize">
        {full_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Accounts" />,
    dataIndex: "accounts",
    key: "accounts",
    width: 200,
    render: (accounts: any[]) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 pl-6">
        {accounts?.length ?? 0}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Phone Number" />,
    dataIndex: "phone_number",
    key: "phone_number",
    render: (phone_number: string) => (
      <Text className="font-medium text-gray-700 tracking-wider">
        {phone_number}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Gender" />,
    dataIndex: "gender",
    key: "gender",
    render: (gender: string) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 capitalize">
        {gender}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Account Status" />,
    dataIndex: "status",
    key: "status",
    render: (_: string, row: any) => (
      <Tooltip size="sm" content={() => "Change Status"} placement="top" color="invert">
        <div className="flex items-center justify-start gap-3 pe-4 w-full pl-10">
          <ActionIcon
            tag="span"
            size="lg"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => changeStatus(row.id, row.status)}
          >
            {row.status === "pending" || row.status === "rejected" ? (
              <RiToggleLine size={30} color="gray" />
            ) : (
              <IoToggleSharp size={30} color="green" />
            )}
          </ActionIcon>
        </div>
      </Tooltip>
    ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "status",
    key: "status",
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {(permissions.includes("update:member") ||
          permissions.includes(
            "create:payment"
          )) &&
          row?.accounts &&
          row?.accounts.length > 0 && (
            <DropDown
              viewHref={routes.home.members["view-member"](row.id)}
              depositHref={routes.home.members["view-member"](row.id)}
              withdrawHref={routes.home.members["view-member"](row.id)}
              accounts={row?.accounts}
            />
          )}
      </div>
    ),
  },
];
//         // <Link href={routes.home.members["view-member"](row.id)}>
