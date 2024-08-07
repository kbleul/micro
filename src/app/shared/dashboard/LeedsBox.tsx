"use client";

import { timeSectionOptions } from "@/constants/form-constants";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import LeedsCard from "./LeedsCard";
import BoxHeader from "./BoxHeader";

export type SocialLeedsArrType = {
  [key: string]: { id: string; name: string; key: string };
};

const SocialLeedsArr: SocialLeedsArrType = {
  facebook_click: {
    id: "SocialLeeds1",
    name: "Facebook",
    key: "facebook_click",
  },
  instagram_click: {
    id: "SocialLeeds2",
    name: "Instagram",
    key: "instagram_click",
  },
  twitter_click: {
    id: "SocialLeeds3",
    name: "Twitter",
    key: "twitter_click",
  },
  linkedIn_click: {
    id: "SocialLeeds4",
    name: "LinkedIn",
    key: "linkedin_click",
  },
  phone_click: {
    id: "SocialLeeds5",
    key: "phone_click",
    name: "Phone Click",
  },
  map_click: {
    id: "SocialLeeds6",
    key: "map_click",
    name: "Map",
  },
  telegram_click: {
    id: "SocialLeeds7",
    key: "telegram_click",
    name: "Telegram",
  },
  whatsapp_click: {
    id: "SocialLeeds8",
    key: "whatsapp_click",
    name: "Whatsapp",
  },
  website_click: {
    id: "SocialLeeds9",
    key: "website_click",
    name: "Website",
  },
};

const LeedsBox = ({ queryStr }: { queryStr: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const leadsData = useFetchData(
    [queryKeys.getLeadsStats],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}${queryStr}/dashboard/leads-graph`,
    headers
  );

  if (leadsData.isPending || leadsData.isFetching) {
    return <></>;
  }

  const leadsDataobj: {
    phone_click: number;
    map_click: number;
    telegram_click: number;
    whatsapp_click: number;
    facebook_click: number;
    website_click: number;
    total: number;
  } = leadsData.data?.data;

  return (
    <article className="border border-[#D0D0D0] rounded-lg px-4 py-6 ">
      <BoxHeader title="Top Leads" optionsList={timeSectionOptions} />

      <section className="flex flex-col gap-4 justify-between items-start mt-4">
        {Object.keys(leadsDataobj).map((leedKey: string) => {
          return (
            SocialLeedsArr[leedKey] && (
              <LeedsCard
                key={leedKey}
                leedData={SocialLeedsArr[leedKey]}
                leadsDataobj={leadsDataobj}
              />
            )
          );
        })}
      </section>
    </article>
  );
};

export default LeedsBox;
