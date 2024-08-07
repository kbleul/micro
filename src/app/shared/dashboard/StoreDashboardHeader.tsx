"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "rizzui";
import cartImg from "@public/cart.svg";
import { FaPlus } from "react-icons/fa6";

const StoreDashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <article className="w-full flex flex-col md:flex-row p-4  md:px-12 md:py-10 border rounded-lg">
      <section className="w-full md:w-1/2">
        <div className="text-2xl md:text-4xl text-black font-bold">
          <p>Good Morning,</p>
          <p>
            {session?.user.user.first_name + " " + session?.user.user.last_name}
          </p>
        </div>

        <p className="my-4 md:my-6 text:lg md:text-xl text-[#5F5F5F]">
          Lorem ipsum dolor sit amet consectetur. Non tellus congue sed eget
          sagittis habitant id fringilla nisi. Id aliquam feugiat.
        </p>

        <Button
          tag="button"
          size="xl"
          color="primary"
          type="button"
          className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63] mt-4 h-12 px-4 py-3 lg:px-8 xl:px-10 flex justify-between items-center gap-x-2"
        >
          <FaPlus />
          Add Product
        </Button>
      </section>
      <section className="w-1/2 hidden md:block">
        <Image
          src={cartImg}
          alt="cart image"
          className="dark:invert ml-[20%]"
          priority
        />
      </section>
    </article>
  );
};

export default StoreDashboardHeader;
