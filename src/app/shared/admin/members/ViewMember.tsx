"use client";

import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";

import React, { useState } from "react";
import PageHeader from "../../page-header";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import TransactionsHistory from "./TransactionsHistory";
import DepositForm from "./DepositForm";
import WithdrawalForm from "./Withdraw";
import AccountInfo from "./AccountInfo";
import { Title } from "rizzui";
import { memberType } from "types/common_types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LoanApplication from "./LoanApplication";
import { useLocation } from "react-use";

export const CategoriesArr = [
  "Account Info",
  "Ledger",
  "Deposit",
  "Withdraw",
  "Loan ",
];

const ViewMember = () => {
  console.log("categoryLink")
  const headers = useGetHeaders({ type: "Json" });
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const actionParam = queryParams.get("action");

  const pathname = usePathname().split("/");
  const memberId = pathname[2];
  const accountId = pathname[4];

  const [categoryLink, setCategoryLink] = useState(
    actionParam
      ? actionParam === "deposit"
        ? CategoriesArr[2]
        : CategoriesArr[3]
      : CategoriesArr[0]
  );

  const [refetchAccount, setRefetchAccount] = useState(false);

  const pageHeader = {
    title: "View Member",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        href: routes.home.members.view_all,
        name: "Members",
      },
      {
        name: "View Account",
      },
    ],
  };

  const clientData = useFetchData(
    [queryKeys.getAllUsers + memberId, memberId, refetchAccount],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}members/${memberId}`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    clientData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const MemberInfo: memberType = clientData.data.data;
  const currentAccount = MemberInfo?.accounts.find(
    (account) => account.id === accountId
  );

  const dispatchComponent = (categoryLink: string) => {
    console.log(categoryLink)
    switch (categoryLink) {
      case CategoriesArr[1]:
        return (
          <TransactionsHistory
            memberId={memberId}
            accountId={accountId}
            accountNumber={currentAccount?.number ?? ""}
          />
        );

      case CategoriesArr[2]:
        return (
          <DepositForm
            memberId={memberId}
            accountId={accountId}
            accountNumber={currentAccount?.number ?? ""}
            currentBalance={currentAccount?.balance ?? 0}
            minimumThreshold={
              currentAccount?.account_type.minimum_threshold ?? 0
            }
            setCategoryLink={setCategoryLink}
            setRefetchAccount={setRefetchAccount}
          />
        );

      case CategoriesArr[3]:
        return (
          <WithdrawalForm
            memberId={memberId}
            accountId={accountId}
            accountNumber={currentAccount?.number ?? ""}
            currentBalance={currentAccount?.balance ?? 0}
            setCategoryLink={setCategoryLink}
            setRefetchAccount={setRefetchAccount}
          />
        );

      case CategoriesArr[4]:
        return (
          <LoanApplication
            memberId={memberId}
            accountId={accountId}
            accountNumber={currentAccount?.number ?? ""}
            currentBalance={currentAccount?.balance ?? 0}
            setCategoryLink={setCategoryLink}
            setRefetchAccount={setRefetchAccount}
          />
        );

      default:
        return <AccountInfo userData={MemberInfo} accountId={accountId} />;
    }
  };

  return (
    <main className="">
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      >
        <div className="md:justify-end items-center mt-8 md:mt-0 hidden md:flex">
          <Image
            src={MemberInfo?.photo}
            alt="profile"
            width={100}
            height={100}
            className="w-14 h-14 rounded-full "
          />

          <div className="pb-1">
            <Title as="h5" className="px-5 font-medium text-base">
              {MemberInfo.full_name}
            </Title>
            <Title as="h5" className="px-5 mt-1 font-normal text-sm">
              Account No. -{" "}
              <span className="underline">{currentAccount?.number}</span>
            </Title>
          </div>
        </div>
      </PageHeader>

      <div className="mt-10">
        <CustomCategoryButton
          categoryLink={categoryLink}
          setCategoryLink={setCategoryLink}
          categoriesArr={CategoriesArr}
          labels={CategoriesArr}
        />
      </div>

      <div className="md:justify-end items-center my-8 flex md:hidden">
        <Image
          src={MemberInfo?.photo}
          alt="profile"
          width={100}
          height={100}
          className="w-14 h-14 rounded-full "
        />

        <div className="pb-1">
          <Title as="h5" className="px-5 font-medium text-base">
            {MemberInfo.full_name}
          </Title>
          <Title as="h5" className="px-5 mt-1 font-normal text-sm">
            Account No. -{" "}
            <span className="underline">{currentAccount?.number}</span>
          </Title>
        </div>
      </div>

      <section className="">{dispatchComponent(categoryLink)}</section>
    </main>
  );
};

export default ViewMember;
