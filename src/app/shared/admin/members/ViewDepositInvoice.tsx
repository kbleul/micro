"use client";
import React, { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import DepositeInvoice from "./DepositeInvoice";

const ViewDepositInvoice = () => {
  // Define the ref with the type of the component you are printing
  const componentRef = useRef<any>(null);

  // Type the useReactToPrint hook, ensuring it returns the correct ref type
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <DepositeInvoice ref={componentRef} />

      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default ViewDepositInvoice;
