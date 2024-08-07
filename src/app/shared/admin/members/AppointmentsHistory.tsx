import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import React, { useState } from "react";
import { useModal } from "../../modal-views/use-modal";
import { useFetchData } from "@/react-query/useFetchData";
// import { getColumns } from "./history_columns";
import { queryKeys } from "@/react-query/query-keys";
import { getColumns } from "./members_column";
// import SessionForm from "../questionnairs/session-form";

const AppointmentsHistory = ({ clientId }: { clientId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const { openModal } = useModal();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const appointments = useFetchData(
    [
      queryKeys.getAccountTypes + clientId,
      clientId,
      currentPage,
      pageSize,
    ],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-appointment-histories/${clientId}`,
    headers
  );

  const addSessionSummary = (appointmentId: string) => {
    openModal({
      view: <Sessionnotes appointmentId={appointmentId} />,
      customSize: "600px",
    });
  };

  const Sessionnotes = ({ appointmentId }: { appointmentId: string }) => {
    return (
      <div className="bg-[#FFF9F2] pb-4 pr-4">
        <></>
        {/* <SessionForm clientId={clientId} appointmentId={appointmentId} /> */}
      </div>
    );
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
            isLoading={appointments.isLoading}
            data={appointments?.data?.data?.data}
            columns={getColumns(() => {}, [])}
            scroll={{ x: 400 }}
            variant={"modern"}
            className="mt-4"
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: appointments?.data?.data?.total,
              current: currentPage,
              onChange: (page: number) => setCurrentPage(page),
            }}
          />
        </div>
      </WidgetCard>
    </article>
  );
};

export default AppointmentsHistory;
