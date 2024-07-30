"use client";

import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";

const Loading = () => {

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Loading...
        </Title>
      </div>
      <Spinner size="sm" />
    </div>
  );
};

export default Loading;
