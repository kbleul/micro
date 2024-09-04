"use client";

import { routes } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import { Button, Title } from "rizzui";
import { memberType } from "types/common_types";
import { useModal } from "../../modal-views/use-modal";
import AddAccountForm from "./AddAccountForm";

const LeftSectionProfile = ({ userData }: { userData: memberType }) => {
  const { openModal } = useModal();

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

      <section className="px-4 border-t pt-10 pb-4 my-5">
        <Title as="h5" className="text-xl font-medium ml-2">
          Accounts
        </Title>

        <div className="">
          {userData.accounts.map((account) => (
            <Link
              href={routes.home.members["view-member-account"](
                userData.id,
                account.id
              )}
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
            </Link>
          ))}
        </div>

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
      </section>
    </article>
  );
};

export default LeftSectionProfile;
