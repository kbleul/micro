"use client";

import React from "react";
import { Button, Title } from "rizzui";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";

import Link from "next/link";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import { useSession } from "next-auth/react";
import { handleFetchState } from "@/utils/fetch-state-handler";

const BranchesList = () => {
  const { data: session } = useSession();


  const headers = useGetHeaders({ type: "Json" });

  const pageHeader = {
    title: "Branches",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        name: "Branches",
      },
    ],
  };

  const branchesData = useFetchData(
    [queryKeys.getAllBranches],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}branches`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    branchesData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const Branches = branchesData?.data?.data ?? null;

  return (
    <article>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      {session?.user?.permissions &&
        session?.user?.permissions.includes("create:branch") &&
        Branches.length === 0 && (
          <div className="my-10 flex flex-col gap-y-5 items-center justify-center text-lg mt-[20vh]">
            <p>No branches added yet.</p>

            <Button
              size="lg"
              color="primary"
              className="text-white bg-primary-dark"
            >
              <Link
                className="w-full h-full"
                href={routes.home.branches["add-branch"]}
              >
                Add Branch
              </Link>
            </Button>
          </div>
        )}

      {session?.user?.permissions &&
        session?.user?.permissions.includes("create:branch") &&
        Branches.length > 0 && (
          <div className="flex justify-end mb-6">
            <Button
              size="lg"
              color="primary"
              className="text-white bg-primary-dark"
            >
              <Link
                className="w-full h-full"
                href={routes.home.branches["add-branch"]}
              >
                Add Branch
              </Link>
            </Button>
          </div>
        )}

      <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-stretch justify-start gap-x-[2.6%] gap-y-10 flex-wrap mt-10">
        {Branches &&
          Branches.map((branch: any) => (
            <section
              className=" mb-4 border rounded-xl shadow-md overflow-hidden relative"
              key={branch.id}
            >
              {/* <SideMenu branch={branch} /> */}

              <div className="p-4">
                <Title as="h6" className="text-lg font-medium line-clamp-1">
                  {branch.name}
                </Title>

                <p className="text-xs line-clamp-1">
                  Address: {branch.address}
                </p>

                <Button
                  color="primary"
                  type="button"
                  className={
                    "w-full text-white bg-primary-dark hover:text-white hover:border-none mt-10 mb-2"
                  }
                >
                  <Link
                    href={routes.home.branches["view-branch"](branch.id)}
                    className="w-full h-full"
                  >
                    View
                  </Link>
                </Button>
              </div>
            </section>
          ))}
      </article>
    </article>
  );
};



export default BranchesList;
