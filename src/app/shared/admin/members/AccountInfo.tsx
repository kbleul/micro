import React from "react";
import { SlCalender } from "react-icons/sl";
import { memberType } from "types/common_types";

const AccountInfo = ({
  userData,
  accountId,
}: {
  userData: memberType;
  accountId: string;
}) => {
  const currentAccount = userData.accounts.find(
    (account) => account.id === accountId
  );

  return (
    <article>
      <section className="grid grid-cols-3 gap-x-16">
        <div className="">
          <p className=" font-medium text-base mb-1">Account Number</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {currentAccount?.number}
          </p>
        </div>
        <div className="">
          <p className=" font-medium text-base mb-1">Account Type</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {currentAccount?.account_type?.name}
          </p>
        </div>
        <div className="">
          <p className=" font-medium text-base mb-1">Saving Period</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {currentAccount?.account_type?.saving_period}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-x-16 mt-6">
        <div className="">
          <p className=" font-medium text-base mb-1">Penality Rate</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {currentAccount?.account_type?.penalty_rate}%
          </p>
        </div>
        <div className="">
          <p className=" font-medium text-base mb-1">Interest Rate</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {currentAccount?.account_type?.interest_rate}%
          </p>
        </div>
        <div className="">
          <p className=" font-medium text-base mb-1">Interest Period</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {currentAccount?.account_type?.interest_period}
          </p>
        </div>
        <div className="mt-6">
          <p className=" font-medium text-base mb-1">Minimum deposit threshold(on each payment)</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {currentAccount?.account_type?.minimum_threshold} birr
          </p>
        </div>
      </section>
    </article>
  );
};

export default AccountInfo;
