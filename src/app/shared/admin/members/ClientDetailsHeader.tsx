import React from "react";
import BgImage from "@public/bg.png";
import Image from "next/image";
import { memberType } from "./ViewMember";

const ClientDetailsHeader = ({ userData }: { userData: memberType }) => {
  console.log(userData?.photo);
  return (
    <article className="mb-20">
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
            <section
              className="w-16 h-16 md:w-28 md:h-28 gap-x-4 border border-white  bg-[#e1f7e6] rounded-full shadow-sm overflow-hidden  z-10"
              style={{
                backgroundImage: `url('${
                  !userData?.photo ||
                  (userData?.photo === "" &&
                    "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg")
                }')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 100,
              }}
            >
              <Image src={userData?.photo} alt="profile image" width={120} height={120} />
            </section>
          </section>
        </section>
      </article>
    </article>
  );
};

export default ClientDetailsHeader;
