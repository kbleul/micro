"use client";

import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";

import React, { useState } from "react";
import PageHeader from "../../page-header";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";
import ClientDetailsHeader from "./ClientDetailsHeader";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import ClientInfo from "./ClientInfo";
import UpcommingAppointments from "./UpcommingAppointment";
import TransactionsHistory from "./TransactionsHistory";
import DepositForm from "./DepositForm";
import WithdrawalForm from "./Withdrawal";

export type memberType = {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  photo: string;
  account: { number: string; status: string };
  marriage_status: string;
};
export const CategoriesArr = [
  "Personal Info",
  // "Account Info",
  "Transactions",
  "Deposit",
  // "Withdrawal",
];

const ViewMember = ({
  memberId,
  className,
}: {
  memberId: string;
  className?: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

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
        name: "VIew Member",
      },
    ],
  };

  const clientData = useFetchData(
    [queryKeys.getAllUsers + memberId, memberId],
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

  const MemberInfo = clientData.data.data;

  return (
    <main className="">
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      <div className="my-3 mb-6">
        <ClientDetailsHeader userData={MemberInfo} />
      </div>

      <CustomCategoryButton
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />

      <section className="my-2">
        {categoryLink === CategoriesArr[0] && (
          <ClientInfo userData={MemberInfo} />
        )}

        {/* {categoryLink === CategoriesArr[1] && (
          <UpcommingAppointments clientId={memberId} />
        )} */}

        {categoryLink === CategoriesArr[1] && (
          <TransactionsHistory
            memberId={memberId}
            accountId={MemberInfo?.account?.id}
          />
        )}

        {categoryLink === CategoriesArr[2] && (
          <DepositForm
            memberId={memberId}
            accountId={MemberInfo?.account?.id}
            accountNumber={MemberInfo?.account?.number}
            setCategoryLink={setCategoryLink}
          />
        )}

        {/* {categoryLink === CategoriesArr[3] && (
          <WithdrawalForm
            memberId={memberId}
            accountId={MemberInfo?.account?.id}
            accountNumber={MemberInfo?.account?.number}
            currentBalance={MemberInfo?.account?.balance}
            setCategoryLink={setCategoryLink}
          />
        )} */}
      </section>
    </main>
  );
};

export default ViewMember;
