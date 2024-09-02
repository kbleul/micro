"use client";


import { useGetHeaders } from "@/hooks/use-get-headers";
import LeedsCard from "./LeedsCard";
import BoxHeader from "./BoxHeader";
import { periodOptions } from "@/utils/dummy";

export type SocialLeedsArrType = {
  [key: string]: { id: string; name: string; key: string };
};

const SocialLeedsArr: SocialLeedsArrType = {
  facebook_click: {
    id: "SocialLeeds1",
    name: "Bole",
    key: "facebook_click",
  },
  instagram_click: {
    id: "SocialLeeds2",
    name: "Kera",
    key: "instagram_click",
  },
  twitter_click: {
    id: "SocialLeeds3",
    name: "Lafto",
    key: "twitter_click",
  },
  linkedIn_click: {
    id: "SocialLeeds4",
    name: "Merkato",
    key: "linkedin_click",
  },
  phone_click: {
    id: "SocialLeeds5",
    key: "phone_click",
    name: "Semit",
  },
  map_click: {
    id: "SocialLeeds6",
    key: "map_click",
    name: "Koye",
  },
  telegram_click: {
    id: "SocialLeeds7",
    key: "telegram_click",
    name: "Bambis",
  },
  whatsapp_click: {
    id: "SocialLeeds8",
    key: "whatsapp_click",
    name: "Mexico",
  },
  website_click: {
    id: "SocialLeeds9",
    key: "website_click",
    name: "Stadium",
  },
};

const LeedsBox = ({ analytics }: { analytics: any }) => {
  const headers = useGetHeaders({ type: "Json" });


  const leadsDataobj: {
    phone_click: number;
    map_click: number;
    telegram_click: number;
    whatsapp_click: number;
    facebook_click: number;
    website_click: number;
    twitter_click: number;
    total: number;
  } = {
    phone_click: 700,
    map_click: 500,
    telegram_click: 800,
    whatsapp_click: 625,
    facebook_click: 500,
    website_click: 790,
    twitter_click: 700,
    total: 875,
  }

  return (
    <article className=" rounded-lg px-4 py-6 ">
      <BoxHeader title="Top Branches By New Branch" optionsList={periodOptions} />

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
