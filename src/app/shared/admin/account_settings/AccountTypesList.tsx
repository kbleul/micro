"use client";

import React from "react";
import { Button, Title } from "rizzui";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";

import { routes } from "@/config/routes";
import { useModal } from "@/app/shared/modal-views/use-modal";
import PageHeader from "@/app/shared/page-header";
import { useSession } from "next-auth/react";
import { handleFetchState } from "@/utils/fetch-state-handler";
import AddTypeForm from "./AddTypeForm";
import AddBtnContainer from "@/components/AddBtnContainer";

const AccountTypesList = () => {
  const { data: session } = useSession();

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
        name: "Account Types",
      },
    ],
  };
  const typesData = useFetchData(
    [queryKeys.getAccountTypes],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    typesData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const Terms: any[] = typesData?.data?.data?.accountTypes ?? null;

  return (
    <article>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      {session?.user?.permissions &&
        session?.user?.permissions.includes("create:account-type") && (
          <AddBtnContainer
            items={Terms}
            actionName="account type"
            onClick={() =>
              openModal({
                view: <AddTypeForm />,
                customSize: "1550px",
              })
            }
            btntext="Add type"
          />
        )}

      <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-stretch justify-start gap-x-[2.6%] gap-y-10 flex-wrap mt-10">
        {Terms &&
          Terms.map((term: any) => (
            <section
              className=" mb-4 border rounded-xl shadow-md overflow-hidden relative"
              key={term.id}
            >
              {/* <SideMenu term={term} /> */}

              <div className="p-4">
                <Title as="h6" className="text-xl font-medium h-14">
                  {term.name}
                </Title>

                <Button
                  color="primary"
                  type="button"
                  className={
                    "w-full text-white bg-primary-dark hover:text-white hover:border-none mt-4 mb-2"
                  }
                  onClick={() => {
                    openModal({
                      view: <AddTypeForm id={term.id} />,
                      customSize: "1550px",
                    });
                  }}
                >
                  View
                </Button>
              </div>
            </section>
          ))}
      </article>
    </article>
  );
};


export default AccountTypesList;
