import { Metadata } from "next";
import logoImg from "@public/logo.png";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "Droga Micro Finance",
  description: `Droga Micro Finance`,
  logo: logoImg,
  mode: MODE.LIGHT,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title}` : title,
      description,
      url: "#",
      siteName: "Droga Micro Finance",
      // images: {
      //   url: "",
      //   width: 1200,
      //   height: 630,
      // },
      locale: "en_US",
      type: "website",
    },
  };
};
