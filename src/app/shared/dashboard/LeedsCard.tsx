import React from "react";

const calculateLeedsValuePrecentage = (
  total: number,
  leedValue: number
): number => {
  if (total === 0 || leedValue === 0) {
    return 1;
  }
  return Math.round((leedValue / total) * 100);
};
const LeedsCard = ({
  leedData,
  leadsDataobj,
}: {
  leedData: {
    id: string;
    name: string;
    key: string;
  };
  leadsDataobj: {
    [key: string]: number;
    phone_click: number;
    map_click: number;
    telegram_click: number;
    whatsapp_click: number;
    facebook_click: number;
    website_click: number;
    total: number;
  };
}) => {
  const percentageValue = calculateLeedsValuePrecentage(
    leadsDataobj.total,
    leadsDataobj[leedData.key]
  );

  return (
    <article className="w-full ">
      <p className="font-medium">{leedData.name}</p>
      <section className="flex items-center gap-2">
        <div
          className={"bg-[#4771F1] rounded-md h-8 mt-1 "}
          style={{
            width: percentageValue + "%",
          }}
        />
        <p>{leadsDataobj[leedData.key]}</p>
      </section>
    </article>
  );
};

export default LeedsCard;
