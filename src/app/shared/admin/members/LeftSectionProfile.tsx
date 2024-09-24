"use client";

import { routes } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import { Button, Title } from "rizzui";
import { memberType } from "types/common_types";
import { useModal } from "../../modal-views/use-modal";
import AddAccountForm from "./AddAccountForm";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import BuyShare from "./BuyShare";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LeftSectionProfile = ({ userData }: { userData: memberType }) => {
  const { openModal } = useModal();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <article
      className={`col-span-1 border-r relative h-[80vh] ${userData.accounts.length > 3 && "hover:overflow-y-scroll"} `}
    >
      <section className="flex flex-col justify-center items-center gap-2 py-8">
        <section
          className="w-16 h-16 md:w-28 md:h-28 gap-x-4 border border-white  bg-[#e1f7e6] rounded-full shadow-sm overflow-hidden  z-10"
          style={{
            backgroundImage: `url('${
              !userData?.photo ||
              (userData?.photo === "" &&
                "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg")
            }')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 100,
          }}
        >
          <Image
            src={userData?.photo}
            alt="profile image"
            width={120}
            height={120}
          />
        </section>

        <p className="capitalize font-medium">
          {userData.first_name + " " + userData.last_name}
        </p>
        <p className="capitalize font-medium">
          {"+251" + userData?.phone_number.slice(1)}
        </p>
      </section>

      {session?.user?.permissions.includes("read:share") && (
        <ShareBox memberId={userData.id} />
      )}

      <section className="px-4 border-t pt-10 pb-4 my-5">
        <Title as="h5" className="text-xl font-medium ml-2">
          Accounts
        </Title>

        <div className="">
          {userData.accounts.map((account) => (
            <button
            onClick={() =>  router.push(routes.home.members["view-member-account"](
              userData.id,
              account.id
            ))
            }
              key={account.id}
              className="flex justify-between items-center border my-4 rounded-xl px-4 py-4 hover:opacity-80 w-full"
            >
              <div className="flex flex-col">
                <p className="">{account.number}</p>
                <p className="text-xs">{account?.account_type?.name}</p>
              </div>

              <div className="border rounded-lg px-4 py-1 bg-primary hover:bg-primary-dark text-white font-medium text-xs">
                <p className="">Manage</p>
              </div>
            </button>
          ))}
        </div>

        {session?.user?.permissions &&
          session?.user?.permissions.includes("create:account") && (
            <div className="w-full flex justify-center items-center">
              <Button
                color="primary"
                size="xl"
                className={`mt-10 xl:mt-0 ${userData.accounts.length < 3 && "xl:absolute bottom-4"}  w-3/5 py-1`}
                onClick={() => {
                  openModal({
                    view: <AddAccountForm memberId={userData.id} />,
                  });
                }}
              >
                Add New Account
              </Button>
            </div>
          )}
      </section>
    </article>
  );
};

const ShareBox = ({ memberId }: { memberId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const { openModal } = useModal();
  const { data: session } = useSession();

  const sharesData = useFetchData(
    [queryKeys.getShare + memberId, memberId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}shares/my-shares/${memberId}`,
    headers
  );

  if (sharesData.isFetching) {
    return <></>;
  }

  const shares: {
    quantity: number;
  }[] = sharesData?.data?.data;
  const sharesValue = shares.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0
  );

  return (
    <section className="px-4 border-t pt-4 pb-1 my-5">
      <Title as="h5" className="text-xl font-medium ml-2">
        Shares
      </Title>

      <div className="">
        {session?.user?.permissions.includes("create:share") && (
          <div className="flex justify-between items-center border my-4 rounded-xl px-4 py-4 w-full">
            <div className="flex flex-col text-left">
              <p className="text-lg font-medium">{sharesValue}</p>
              <p className="text-xs">Shares owned</p>
            </div>

            <button
              className="border rounded-lg px-4 py-1 bg-primary hover:bg-primary-dark text-white font-medium text-xs"
              onClick={() => {
                openModal({
                  view: <BuyShare member_id={memberId} />,
                });
              }}
            >
              <p className="">Buy more</p>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeftSectionProfile;
