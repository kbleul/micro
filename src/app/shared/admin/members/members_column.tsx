"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import Image from "next/image";
import { IoToggleSharp } from "react-icons/io5";
import { RiToggleLine } from "react-icons/ri";



export const getColumns = (changeStatus: (id: number, currentStatus: string) => void, permissions: string[]) => [
  {
    title: <HeaderCell title="Photo" />,
    dataIndex: "photo",
    key: "photo",
    width: 20,
    render: (photo: string | null | undefined) => (
      <div>
        {photo && photo !== "" ? (
          <Image
            src={photo}
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
    title: <HeaderCell title="Account No." />,
    dataIndex: "membership_number",
    key: "membership_number",
    width: 50,
    render: (membership_number: string) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1">
        {membership_number}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Full Name" />,
    dataIndex: "full_name",
    key: "full_name",
    width: 130,
    render: (full_name: string) => (
      <Text className="font-medium text-gray-700 line-clamp-1 capitalize">
        {full_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Phone Number" />,
    dataIndex: "phone_number",
    key: "phone_number",
    width: 120,
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
    width: 100,
    render: (gender: string) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 capitalize">
        {gender}
      </Text>
    ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {permissions.includes("update:member") &&
          <Tooltip
            size="sm"
            content={() => "Accept Account Creation"}
            placement="top"
            color="invert"
          >
            <ActionIcon
              tag="span"
              size="lg"
              variant="outline"
              className="hover:text-gray-700"
              onClick={() => changeStatus(row.id, row.status)}
            >
              {row.status === "pending" || row.status === "rejected"  ? (
                <RiToggleLine size={30} />

              ) : (
                <IoToggleSharp size={30} />

              )}
            </ActionIcon>
          </Tooltip>
        }
      </div>
    ),
  },
];
