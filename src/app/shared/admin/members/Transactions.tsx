import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import React, { useState } from "react";
import { useModal } from "../../modal-views/use-modal";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { getColumns } from "./transactions_column";
import ViewDepositInvoice from "./ViewDepositInvoice";
import { Title } from "rizzui";

const TransactionsHistory = ({
  title,
  type,
  memberId,
  accountId,
  accountNumber,
}: {
  title: string;
  type: string;
  accountNumber: string;
  memberId: string;
  accountId: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });
  const { openModal } = useModal();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const ledgerData = useFetchData(
    [queryKeys.getAllTransactions + memberId, memberId, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}accounts/ledgernnnn/${accountId}?type=${type}`,
    headers
  );

  const fetchStateHandler = handleFetchState(ledgerData);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const Transactions = ledgerData?.data?.data?.ledger ?? [];

  const viewInvoice = (row: any) => {
    openModal({
      view: (
        <ViewDepositInvoice
          ledgerData={row}
          memberId={memberId}
          accountNumber={accountNumber}
        />
      ),
      customSize: "1200px",
    });
  };

  return (
    <article className="">
      <Title as="h4" className="border-b mb-4 pb-1 font-medium text-xl">
        {title}
      </Title>

      <WidgetCard
        title={""}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            isLoading={ledgerData.isLoading}
            data={Transactions}
            columns={getColumns(viewInvoice)}
            scroll={{ x: 1800 }}
            variant={"modern"}
            className="mt-4"
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: ledgerData?.data?.data?.total,
              current: currentPage,
              onChange: (page: number) => setCurrentPage(page),
            }}
          />
        </div>
      </WidgetCard>
    </article>
  );
};

export default TransactionsHistory;
