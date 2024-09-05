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
      <section className="grid md:grid-cols-3 gap-x-16 gap-y-4">
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

      <section className="grid md:grid-cols-3 gap-x-16 gap-y-4 mt-6">
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
        <div className="md:mt-6">
          <p className=" font-medium text-base mb-1">
            Minimum deposit threshold(on each payment)
          </p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {currentAccount?.account_type?.minimum_threshold} birr
          </p>
        </div>

        <h6 className="col-span-3 text-left font-medium mt-5">Interest Teirs</h6>

        {currentAccount?.account_type?.interest_tiers &&
          currentAccount?.account_type?.interest_tiers.map((teir) => (
            <section
              className="grid md:grid-cols-3 gap-x-16 gap-y-4 col-span-3"
              key={teir?.id}
            >
              <div className="">
                <p className=" font-medium text-base mb-1">
                Interest Rate
                </p>
                <p className="border rounded-md border-black p-3 capitalize font-medium">
                  {teir?.interest_rate} %
                </p>
              </div>

              <div className="md:mt-6">
                <p className=" font-medium text-base mb-1">
                Threshold
                </p>
                <p className="border rounded-md border-black p-3 capitalize font-medium">
                  {teir?.threshold} birr
                </p>
              </div>
            </section>
          ))}

        <h6 className="col-span-3 text-left font-medium mt-5">Loan Teirs</h6>

        {currentAccount?.account_type?.loan_tiers &&
          currentAccount?.account_type?.loan_tiers.map((teir) => (
            <section
              className="grid md:grid-cols-3 gap-x-16 gap-y-4 col-span-3"
              key={teir?.id}
            >
              <div className="">
                <p className=" font-medium text-base mb-1">
                  Max loan amount
                </p>
                <p className="border rounded-md border-black p-3 capitalize font-medium">
                  {teir?.max_loan_amount} birr
                </p>
              </div>

              <div className="md:mt-6">
                <p className=" font-medium text-base mb-1">
                Interest Rate
                </p>
                <p className="border rounded-md border-black p-3 capitalize font-medium">
                  {teir?.interest_rate} %
                </p>
              </div>

              <div className="md:mt-6">
                <p className=" font-medium text-base mb-1">
                Penality Rate
                </p>
                <p className="border rounded-md border-black p-3 capitalize font-medium">
                  {teir?.penalty_rate} %
                </p>
              </div>

              <div className="md:mt-6">
                <p className=" font-medium text-base mb-1">
                  Required Months
                </p>
                <p className="border rounded-md border-black p-3 capitalize font-medium">
                  {teir?.required_months} month
                </p>
              </div>

              <div className="md:mt-6">
                <p className=" font-medium text-base mb-1">
                Multiplier
                </p>
                <p className="border rounded-md border-black p-3 capitalize font-medium">
                  {teir?.max_loan_multiplier} times
                </p>
              </div>
            </section>
          ))}
      </section>
    </article>
  );
};

export default AccountInfo;
