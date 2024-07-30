import React from "react";
import { BarLoader } from "react-spinners";

const BoxLoader = () => {
  return (
    <div className="w-full mb-6 px-4 md:px-10 py-4 md:py-8 rounded-xl bg-yellow-100 flex justify-center items-center">
      <BarLoader
        color={"#000"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={150}
      />
    </div>
  );
};

export default BoxLoader;
