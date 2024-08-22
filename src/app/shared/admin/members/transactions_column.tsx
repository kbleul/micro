"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";


export const getColumns = () => [
  {
    title: <HeaderCell title="Account Number" />,
    dataIndex: "account",
    key: "account",
    width: 130,
    render: (account: {number: string}) => (
      <Text className="font-medium text-gray-700 line-clamp-1 capitalize">
        {account.number}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Amount" />,
    dataIndex: "amount",
    key: "amount",
    width: 150,
    render: (amount: string) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1">
        {amount + " Birr"}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Transaction Type" />,
    dataIndex: "type",
    key: "type",
    width: 120,
    render: (type: string) => (
      <Text className={type === "deposit" ? "font-semibold px-4 py-1 xl:ml-7 w-fit bg-green-200 text-green-600 tracking-wider capitalize text-xs" : "font-semibold px-4 py-1 w-fit tracking-wider capitalize bg-red-200 xl:ml-6 text-xs text-red-600"}>
        {type}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Current Balance" />,
    dataIndex: "account",
    key: "account",
    width: 100,
    render: (account: {balance: string}) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 capitalize">
        {account.balance + " Birr"} 
      </Text>
    ),
  },
 

//   {
//     // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
//     title: <HeaderCell title="Actions" className="opacity-0" />,
//     dataIndex: "status",
//     key: "status",
//     width: 120,
//     render: (_: string, row: any) => (
//       <div className="flex items-center justify-end gap-3 pe-4">
//         {permissions.includes("update:member") &&
//           <Tooltip
//             size="sm"
//             content={() => "View member info"}
//             placement="top"
//             color="invert"
//           >
//           <Link href={routes.home.members["view-member"](row.id)}>

//             <ActionIcon
//               tag="span"
//               size="lg"
//               variant="outline"
//               className="hover:text-gray-700"
//               onClick={() => changeStatus(row.id, row.status)}
//             >
//              <TbEye size="25" />
            
//             </ActionIcon>
//             </Link>
//           </Tooltip>
//         }
//       </div>
//     ),
//   },
];
