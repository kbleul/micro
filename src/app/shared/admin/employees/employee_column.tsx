"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import PencilIcon from "@/components/icons/pencil";

import { GrFormView } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import ReusabelPopover from "@/components/reusabel-popover";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/config/routes";
import { truncateAmharicText } from "@/utils/trim-text";

type Columns = {
};

export const getColumns = () => [
  {
    title: <HeaderCell title="Full Name" />,
    dataIndex: "full_name",
    key: "full_name",
    width: 100,
    render: (full_name: string) => (
      <Text className="font-medium text-gray-700 line-clamp-1">{full_name}</Text>
    ),
  },
  {
    title: <HeaderCell title="Role" />,
    dataIndex: "roles",
    key: "roles",
    width: 100,
    render: (roles: {name: string}[]) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1">{roles[0].name}</Text>
    ),
  },
  // {
  //   title: <HeaderCell title="Last Name" />,
  //   dataIndex: "last_name",
  //   key: "last_name",
  //   width: 50,
  //   render: (last_name: string) => (
  //     <Text className="font-medium text-gray-700">{last_name}</Text>
  //   ),
  // },
  {
    title: <HeaderCell title="Gender" />,
    dataIndex: "gender",
    key: "gender",
    width: 120,
    render: (gender: string) => (
      <Text className="font-medium text-gray-700 tracking-wider">{gender}</Text>
    ),
  },
  {
    title: <HeaderCell title="Phone Number" />,
    dataIndex: "phone_number",
    key: "phone_number",
    width: 120,
    render: (phone_number: string) => (
      <Text className="font-medium text-gray-700 tracking-wider">{phone_number}</Text>
    ),
  },
  {
    title: <HeaderCell title="Email" />,
    dataIndex: "email",
    key: "email",
    width: 120,
    render: (email: string) => (
      <Text className="font-medium text-gray-700 tracking-wider">{email}</Text>
    ),
  },

  // {
  //   // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
  //   title: <HeaderCell title="Actions" className="opacity-0" />,
  //   dataIndex: "action",
  //   key: "action",
  //   width: 50,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-end gap-3 pe-4">
  //       <Tooltip
  //         size="sm"
  //         content={() => "View"}
  //         placement="top"
  //         color="invert"
  //       >
  //         <Link href={`${routes.operationalManager.places.view(row.id)}`}>
  //           <ActionIcon
  //             tag="span"
  //             size="sm"
  //             variant="outline"
  //             className="hover:text-gray-700"
  //           >
  //             <GrFormView size={25} />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip>
  //       <Tooltip
  //         size="sm"
  //         content={() => "Edit"}
  //         placement="top"
  //         color="invert"
  //       >
  //         <Link href={`${routes.operationalManager.places.edit(row.id)}`}>
  //           <ActionIcon
  //             tag="span"
  //             size="sm"
  //             variant="outline"
  //             className="hover:text-gray-700"
  //           >
  //             <PencilIcon />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip>
  //       <ReusabelPopover
  //         title={`Delete Product`}
  //         icon={<FaTimes className="h-4 w-4" />}
  //         description={`Are you sure you want to Delte this #${row.id} Product?`}
  //         onDelete={() => deleteProduct(row.id)}
  //       />
  //     </div>
  //   ),
  // },
];
