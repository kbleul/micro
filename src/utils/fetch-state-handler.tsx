import Loading from "../components/ui/Loading";
import React from "react";

export const handleFetchState = (
  fetchState: {
    isPending: boolean;
    isFetching: boolean;
    data?: { error?: { code: number; message: string } };
  },
  children?: React.ReactNode
) => {
  if (fetchState.isPending || fetchState.isFetching) {
    return (
      <main>
        {children}
        <div className=" flex justify-center items-center py-20">
          <Loading />
        </div>
      </main>
    );
  }

  if (fetchState?.data?.error) {
    return (
      <p className=" text-center mt-[20vh] text-lg">
        {" "}
        Unable to complete task !{" "}
      </p>
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
