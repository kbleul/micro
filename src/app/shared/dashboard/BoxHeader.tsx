import SelectLoader from "@/components/loader/select-loader";
import dynamic from "next/dynamic";
import React from "react";
import { Title as TitleRiz } from "rizzui";

const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const BoxHeader = ({
  title,
  optionsList,
}: {
  title: string;
  optionsList: {
    name: string;
    value: string;
  }[];
}) => {
  return (
    <section className="flex justify-between items-start">
      <div>
        <TitleRiz as="h5" className="font-semibold">
          {title}
        </TitleRiz>
      </div>
      <Select
        options={optionsList}
        value={optionsList[0].value}
        onChange={() => {}}
        getOptionValue={(option) => option.name}
        color="primary"
      />
    </section>
  );
};

export default BoxHeader;
