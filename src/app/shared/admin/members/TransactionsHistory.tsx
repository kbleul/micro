import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import React, {  useState } from "react";
import { useModal } from "../../modal-views/use-modal";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { getColumns } from "./transactions_column";
import ViewDepositInvoice from "./ViewDepositInvoice";

const TransactionsHistory = ({
  memberId,
  accountId,
}: {
  memberId: string;
  accountId: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });
  const { openModal } = useModal();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const transactionsData = useFetchData(
    [queryKeys.getAllTransactions + memberId, memberId, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}accounts/transactions/${accountId}`,
    headers
  );

  const fetchStateHandler = handleFetchState(transactionsData);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const Transactions = transactionsData?.data?.data ?? [];

  const viewInvoice = () => {
    openModal({
      view: <ViewDepositInvoice />,
      customSize: "1200px",
    });
  };

  return (
    <article className="">
      <WidgetCard
        title={""}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            isLoading={transactionsData.isLoading}
            data={Transactions}
            columns={getColumns(viewInvoice)}
            scroll={{ x: 400 }}
            variant={"modern"}
            className="mt-4"
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: transactionsData?.data?.data?.total,
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
