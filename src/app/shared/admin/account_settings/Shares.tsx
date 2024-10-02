"use client";

import React from "react";
import { useModal } from "../../modal-views/use-modal";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { routes } from "@/config/routes";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";
import PageHeader from "../../page-header";
import { Button, Title } from "rizzui";
import { shareType } from "types/common_types";
import AddShare from "./AddShare";

const Shares = () => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const pageHeader = {
    title: "Dashboard",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },

      {
        name: "Account Settings",
      },
      {
        name: "Shares",
      },
    ],
  };
  const shareData = useFetchData(
    [queryKeys.getShare],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}shares`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    shareData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const Share: shareType = shareData?.data?.data[0] ?? null;

  return (
    <article>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-stretch justify-start gap-x-[2.6%] gap-y-10 flex-wrap mt-10">
        {Share && (
          <section className=" mb-4 border rounded-xl shadow-md overflow-hidden relative">
            <div className="p-4">
              <Title
                as="h6"
                className="text-xl font-medium h-14 w-full text-center "
              >
                {Share.total_shares} Shares
              </Title>

              <div className="flex justify-between items-center">
                <p>
                  <span className="font-semibold">1</span> Share ={" "}
                  <span className="font-semibold">{Share.share_value}</span>{" "}
                  birr
                </p>

                <p>
                  <span className="font-semibold">
                    {Share.available_shares}
                  </span>{" "}
                  Unsold
                </p>
              </div>

              <Button
                color="primary"
                type="button"
                className={
                  "w-full text-white bg-primary-dark hover:text-white hover:border-none mt-4 mb-2"
                }
                onClick={() => {
                  openModal({
                    view: <AddShare/>,
                  });
                }}
              >
                View
              </Button>
            </div>
          </section>
        )}
      </article>
    </article>
  );
};

export default Shares;
