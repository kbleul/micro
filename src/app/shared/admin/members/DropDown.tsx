"use client";

import { routes } from "@/config/routes";
import Link from "next/link";
import React, { useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { LuFolderOutput, LuUserCircle } from "react-icons/lu";
import { MdOutlineInput, MdOutlineKeyboardArrowRight } from "react-icons/md";

import { ActionIcon, Popover } from "rizzui";
import { accountType } from "types/common_types";

const DropDown = ({
  viewHref,
  depositHref,
  withdrawHref,
  accounts,
}: {
  viewHref: string;
  depositHref: string;
  withdrawHref: string;
  accounts: accountType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <DropdownMenu
          viewHref={viewHref}
          depositHref={depositHref}
          withdrawHref={withdrawHref}
          accounts={accounts}
        />
      )}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 bg-gray-100 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <ActionIcon variant="outline" rounded="full">
        <HiAdjustmentsHorizontal className="h-5 w-5" />
      </ActionIcon>
    </Popover>
  );
};

const DropDownAccounts = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() =>
        item.subMenu.map((x: any) => (
       
          <Link
            key={x.name}
            href={x.href}
            className="group my-0.5 px-8 flex items-center gap-3 rounded-md py-2 hover:bg-gray-200 focus:outline-none hover:dark:bg-gray-700"
          >
            {x.name}
          </Link>
        ))
      }
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 bg-gray-100 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button className="group my-0.5 flex items-center justify-between gap-3 rounded-md px-2.5 py-2 hover:bg-gray-200 focus:outline-none hover:dark:bg-gray-700">
        <div className="flex items-center gap-3">
          {item.icon}
          <p className="text-sm">{item.name}</p>
        </div>

        <p className="">
          <MdOutlineKeyboardArrowRight size={19} />
        </p>
      </button>
    </Popover>
  );
};

function DropdownMenu({
  viewHref,
  depositHref,
  withdrawHref,
  accounts,
}: {
  viewHref: string;
  depositHref: string;
  withdrawHref: string;
  accounts: accountType[];
}) {
  const getAccountItems = (type: string) => {
    return accounts.map((account) => ({
      name: account.number,
      href:
        routes.home.members["view-member-account"](
          account.member_id,
          account.id
        ) + `?action=${type.toLocaleLowerCase()}`,
    }));
  };

  const menuItems = [
    {
      name: "View",
      href: viewHref,
      isNested: false,
      icon: <LuUserCircle size={19} />,
      subMenu: [],
    },
   {
      name: "Deposit",
      href: depositHref,
      isNested: true,
      icon: <MdOutlineInput size={19} className="text-gray-600" />,
      subMenu: getAccountItems("Deposit"),
    },
   {
      name: "Withdraw",
      href: withdrawHref,
      isNested: true,
      icon: <LuFolderOutput size={19} className="text-gray-600" />,
      subMenu: getAccountItems("Withdraw"),
    },
  ];

  return (
    <div className="w-[12rem] text-left rtl:text-right">
      <div className="grid p-1 font-medium text-gray-700">
        {menuItems.map((item:any, index) => (
          <>
            {item.isNested ? (
              <DropDownAccounts item={item} key={index + "mm-key=" + index} />
            ) : (
              <Link
                key={item.name + index}
                href={item.href}
                className="group my-0.5 flex items-center gap-3 rounded-md px-2.5 py-2 hover:bg-gray-200 focus:outline-none hover:dark:bg-gray-700"
              >
                {item.icon}
                <p className="text-sm">{item.name}</p>
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default DropDown;
