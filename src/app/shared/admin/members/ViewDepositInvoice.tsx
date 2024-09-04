"use client";
import React, { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import DepositeInvoice from "./DepositeInvoice";
import { Button } from "rizzui";

const ViewDepositInvoice = ({
  ledgerData,
  memberId,
  accountNumber,
}: {
  ledgerData: any;
  memberId: string;
  accountNumber: string;
}) => {
  // Define the ref with the type of the component you are printing
  const componentRef = useRef<any>(null);

  // Type the useReactToPrint hook, ensuring it returns the correct ref type
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className=" pb-5">
      <DepositeInvoice
        ledgerData={ledgerData}
        memberId={memberId}
        accountNumber={accountNumber}
        ref={componentRef}
      />

      <div className="w-full flex items-center justify-center gap-4 my-5">
        <Button
          type="button"
          className="px-16 bg-primary-dark"
          onClick={handlePrint}
        >
          Print
        </Button>
      </div>
    </div>
  );
};

export default ViewDepositInvoice;
