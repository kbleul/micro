import React from "react";
import BgImage from "@public/bg.png";
import Image from "next/image";
import { memberType } from "types/common_types";

const ClientDetailsHeader = ({ userData }: { userData: memberType }) => {
  return (
    <article className="mb-10">
      <article className="relative">
        <section className="w-full h-[10vh] md:h-[20vh]  overflow-hidden relative">
          <Image
            src={BgImage}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={""}
          />
        </section>

        <section className="branchlogo flex items-start mt-32 justify-start pl-2 md:pl-10">
          <section className="">
         
          </section>
        </section>
      </article>
    </article>
  );
};

export default ClientDetailsHeader;
