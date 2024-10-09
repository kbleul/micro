"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { convertDateTimeFormate } from "@/utils/time_manuplation";
import { TbEye } from "react-icons/tb";
import { ActionIcon, Tooltip } from "rizzui";

export const getColumns = (viewInvoice: (row: any) => void) => [
  {
    title: <HeaderCell title="Invoice Number" />,
    dataIndex: "voucher_number",
    key: "voucher_number",
    width: 130,
    render: (voucher_number: string) => (
      <Text className="font-medium text-gray-700 line-clamp-1 capitalize">
        {voucher_number}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Regular Saving" />,
    dataIndex: "regular_saving",
    key: "regular_saving",
    width: 150,
    render: (regular_saving: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1">
        {regular_saving > 0 ? regular_saving + " Birr" : " "}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Voluntary Saving" />,
    dataIndex: "compulsory_saving",
    key: "compulsory_saving",
    width: 150,
    render: (compulsory_saving: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1">
        {compulsory_saving > 0 ? compulsory_saving + " Birr" : " "}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Loan Repayment" />,
    dataIndex: "paid",
    key: "paid",
    width: 150,
    render: (paid: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 text-center">
        {paid > 0 ? paid + " Birr" : " "}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Withdrawal" />,
    dataIndex: "withdrawal",
    key: "withdrawal",
    width: 150,
    render: (withdrawal: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 text-center">
        {withdrawal > 0 ? withdrawal + " Birr" : " "}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Share" />,
    dataIndex: "share",
    key: "share",
    width: 150,
    render: (share: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1">
        {share  ? share : " "}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Saving Interest" />,
    dataIndex: "saving_interest",
    key: "saving_interest",
    width: 150,
    render: (saving_interest: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 text-center">
        {saving_interest > 0 ? saving_interest + " Birr" : " "}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Loan Interest" />,
    dataIndex: "loan_interest",
    key: "loan_interest",
    width: 150,
    render: (loan_interest: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 text-center">
        {loan_interest > 0 ? loan_interest + " Birr" : " "}
      </Text>
    ),
  },
  
  {
    title: <HeaderCell title="Penalty" />,
    dataIndex: "penalty",
    key: "penalty",
    width: 150,
    render: (penalty: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 text-center">
        {penalty > 0 ? penalty + " Birr" : " "}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Payment Channel" />,
    dataIndex: "payment_channel",
    key: "payment_channel",
    width: 150,
    render: (payment_channel: number) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 text-center">
        {payment_channel > 0 ? payment_channel : " "}
      </Text>
    ),
  },

  
  {
    title: <HeaderCell title="Date " />,
    dataIndex: "date",
    key: "date",
    width: 10,
    render: (date: string) => (
      <Text className="text-sm text-gray-700 text-center">
        {convertDateTimeFormate(date)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Current Balance" />,
    dataIndex: "remaining_principal",
    key: "remaining_principal",
    width: 100,
    render: (remaining_principal: string) => (
      <Text className="font-medium text-gray-700 tracking-wider line-clamp-1 capitalize text-center">
        {remaining_principal + " Birr"}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4 text-center">
        {
          <Tooltip
            size="sm"
            content={() => "View member info"}
            placement="top"
            color="invert"
          >
            <ActionIcon
              tag="span"
              size="lg"
              variant="outline"
              className="hover:text-gray-700"
              onClick={() => viewInvoice(row)}
            >
              <TbEye size="25" />
            </ActionIcon>
          </Tooltip>
        }
      </div>
    ),
  },
];
