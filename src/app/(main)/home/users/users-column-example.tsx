"use client";

import { Text } from "rizzui";
import { HeaderCell } from "@/components/ui/table";

export const getColumns = (isLoading: boolean) => {
  return [
    {
      title: <HeaderCell title="Title" />,
      dataIndex: "name",
      key: "name",
      width: 50,
      render: (value: { english: string }) => (
        <Text className="font-medium text-gray-700">{value?.english}</Text>
      ),
    },
    {
      title: <HeaderCell title="Type" />,
      dataIndex: "type",
      key: "type",
      width: 50,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Price" />,
      dataIndex: "price",
      key: "price",
      width: 50,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Currency" />,
      dataIndex: "currency",
      key: "currency",
      width: 50,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Iteration" />,
      dataIndex: "iteration",
      key: "iteration",
      width: 50,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },

  ];
};

export const xll = () => {
  return [{ id: "--0000" }];
};
