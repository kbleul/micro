"use client";

import React, { useState } from "react";
import { Button, Title } from "rizzui";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";

import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/shared/modal-views/use-modal";
import PageHeader from "@/app/shared/page-header";
import { useSession } from "next-auth/react";
import { handleFetchState } from "@/utils/fetch-state-handler";
import AddRoleForm from "./AddRoleForm";
import ViewRolePermissions from "./ViewRolePermissions";

const BranchesList = () => {
  const { data: session } = useSession();

  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const pageHeader = {
    title: session?.user?.user?.roles[0].Name,
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
    [queryKeys.getAllRoles],
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

      {Branches.length === 0 && (
        <div className="my-10 flex flex-col gap-y-5 items-center justify-center text-lg mt-[20vh]">
          <p>No branches added yet.</p>

          <Button
            size="lg"
            color="primary"
            className="text-white bg-primary-dark"
            onClick={() =>
              openModal({
                view: <AddRoleForm />,
              })
            }
          >
            Add Branch
          </Button>
        </div>
      )}

      {session?.user?.permissions &&
        session?.user?.permissions.includes("create:branch") && Branches.length > 0 && (
          <div className="flex justify-end mb-6">
            <Button
              size="lg"
              color="primary"
              className="text-white bg-primary-dark"
              onClick={() =>
                openModal({
                  view: <AddRoleForm />,
                })
              }
            >
              Add Branch
            </Button>
          </div>
        )}

      <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-stretch justify-start gap-x-[2.6%] gap-y-10 flex-wrap mt-10">
        {Branches &&
          Branches.map((role: any) => (
            <section
              className=" mb-4 border rounded-xl shadow-md overflow-hidden relative"
              key={role.ID}
            >
              {/* <SideMenu role={role} /> */}

              <div className="p-4">
                <Title as="h6" className="text-xl font-medium h-14">
                  {role.Name}
                </Title>

                <Button
                  color="primary"
                  type="button"
                  className={
                    "w-full text-white bg-primary-dark hover:text-white hover:border-none mt-4 mb-2"
                  }
                  onClick={() => {
                    openModal({
                      view: <></>,
                      customSize: "1150px",
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

// const SideMenu = ({ role }: { role: any }) => {
//   const router = useRouter();

//   const { openModal, closeModal } = useModal();

//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <section className=" w-full">
//       <Button
//         color="primary"
//         variant="outline"
//         onClick={() => setShowMenu((prev) => !prev)}
//         className="text-black bg-white z-50  rounded-full  absolute top-3 right-3 py-1 px-[0.6rem] flex justify-center items-center border border-gray-200"
//       >
//         <BsThreeDots size={20} />
//       </Button>
//       {showMenu && (
//         <div
//           className="absolute top-12 right-10 border bg-white flex flex-col"
//           onMouseEnter={() => setShowMenu(true)}
//         >
//           <button
//             type="button"
//             className="py-2 hover:bg-gray-100 px-6 border-b"
//             onClick={() => {
//               setShowMenu(false);
//               openModal({
//                 view: <AddRoleForm id={role.ID} />,
//               });
//             }}
//           >
//             Edit role
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

export default BranchesList;
