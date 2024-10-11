import Loading from "../components/ui/Loading";
import React from "react";

export const handleFetchState = (
  fetchState: {
    isPending: boolean;
    isFetching: boolean;
    data?: { error?: string; code?: number };
  },
  children?: React.ReactNode,
  className?: string
) => {
  if (fetchState.isPending || fetchState.isFetching) {
    return (
      <main className={className}>
        {children}
        <div className=" flex justify-center items-center py-20">
          <Loading />
        </div>
      </main>
    );
  }

  if (fetchState?.data?.error && fetchState?.data?.code === 403) {
    return (
      <section className="mt-[10vh] text-center">
        <div className="flex flex-col gap-4 justify-center items-center px-10 py-6 bg-gray-100 rounded-lg">
          <p className="text-center font-medium  text-lg">
            Unable to complete task !{" "}
          </p>
          <p className="font-medium  px-[10%]">{fetchState?.data?.error}</p>
        </div>
      </section>
    );
  }
 

  return null;
};

export const HandleFetchState = (fetchState: {
  isPending: boolean;
  isFetching: boolean;
  data?: { error?: { code: number; message: string } };
}) => {
  return <></>;
};

export default HandleFetchState;
