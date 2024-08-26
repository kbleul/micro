"use client";

import cn from "@/utils/class-names";
import { ActionIcon } from "@/components/ui/action-icon";
import { useDrawer } from "@/app/shared/drawer-views/use-drawer";
import { Title } from "rizzui";
import { PiXBold } from "react-icons/pi";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useState } from "react";

export default function LogsButton({
  btnName,
  children,
  onClose,
}: {
  btnName: string;
  children?: React.ReactNode;
  onClose: () => void;
}) {
  const { openDrawer, closeDrawer } = useDrawer();

  return (
    <button
      type="button"
      className="w-full text-left rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
      onClick={() =>
        openDrawer({
          view: (
            <>
              <Header onClose={closeDrawer} />
              <Logs />
            </>
          ),
          placement: "right",
          customSize: "420px",
        })
      }
    >
      {btnName}
    </button>
  );
}

const Logs = () => {
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const logsData = useFetchData(
    [queryKeys.getLogs, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}audit-logs/?page=${currentPage}&page_size=${pageSize}`,
    headers
  );

  const fetchStateHandler = handleFetchState(logsData);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  console.log("Logs ---------------> ", logsData?.data);

  const Logs: any[] = logsData?.data ?? [];

  return (
    <article className="">
      {Array.from({ length: 10 }).map((_, index) => (
        <section className="" key={index}>
          <p>This is a test</p>
        </section>
      ))}
    </article>
  );
};

const Header = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
      <Title as="h5" className={cn("font-semibold")}>
        Activity Logs
      </Title>
      <ActionIcon
        variant="outline"
        onClick={onClose}
        className={cn("border-0 p-0")}
      >
        <PiXBold className="h-5 w-5" />
      </ActionIcon>
    </div>
  );
};
