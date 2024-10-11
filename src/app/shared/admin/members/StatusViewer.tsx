import { loanStatusCategorized } from "@/utils/dummy";
import React from "react";
import { Title } from "rizzui";

const StatusViewer = ({
  ableToLoan,
  loanStatus,
}: {
  ableToLoan: boolean;
  loanStatus: string;
}) => {
  const getStatus = () => {
    if (loanStatusCategorized.viewForm.includes(loanStatus)) {
      return loanStatusCategorized.viewForm[
        loanStatusCategorized.viewForm.length - 1
      ];
    } else {
      return loanStatusCategorized.viewLoan[
        loanStatusCategorized.viewLoan.length - 1
      ];
    }
  };

  return (
    <section className="flex justify-between items-center border border-primary rounded-xl p-4 mb-8">
      <div className="">
        <Title as="h4" className="font-medium text-xl text-primary">
          {"Loan Status"}
        </Title>
        {!ableToLoan && loanStatus !== "" && (
          <p className={`text-red-400 font-medium`}>
            {`Loan request is ${loanStatus}.`}
          </p>
        )}

{!ableToLoan && loanStatus === "" && (
          <p className={`text-red-400 font-medium`}>
            {`Minimum saving time not fulfilled yet.`}
          </p>
        )}
      </div>

      <Title
        as="h4"
        className={`pb-1 border px-5 py-2 rounded-lg text-black  bg-primary-light font-normal text-sm capitalize`}
      >
        {!ableToLoan && loanStatus === "" ? "Unable to request" : getStatus()}
      </Title>
    </section>
  );
};

export default StatusViewer;
