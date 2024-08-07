"use client";


import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import BoxHeader from "./BoxHeader";
import { periodOptions } from "@/utils/dummy";
import { GiReceiveMoney } from "react-icons/gi";

type productDataType = {
  productName: string;
  price: number;
  rate: { average: number; users_count: number };
  product_image: {
    uuid: string;
    mime_type: string;
    url: string;
  };
};

const productData: productDataType[] = [
  {
    productName: "Childrens Saving",
    price: 19.99,
    rate: { average: 4.5, users_count: 100 },
    product_image: {
      uuid: "uuid-1",
      mime_type: "image/jpeg",
      url: "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
  },
  {
    productName: "Regular Saving",
    price: 29.99,
    rate: { average: 4.0, users_count: 200 },
    product_image: {
      uuid: "uuid-2",
      mime_type: "image/png",
      url: "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
  },
  {
    productName: "Student Saving",
    price: 39.99,
    rate: { average: 3.5, users_count: 150 },
    product_image: {
      uuid: "uuid-3",
      mime_type: "image/jpeg",
      url: "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
  },
  {
    productName: "Retirement Saving",
    price: 49.99,
    rate: { average: 4.8, users_count: 250 },
    product_image: {
      uuid: "uuid-4",
      mime_type: "image/png",
      url: "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
  },
  {
    productName: "Business Saving",
    price: 59.99,
    rate: { average: 4.3, users_count: 300 },
    product_image: {
      uuid: "uuid-5",
      mime_type: "image/jpeg",
      url: "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
  },
  {
    productName: "Car Payment Saving",
    price: 69.99,
    rate: { average: 3.8, users_count: 120 },
    product_image: {
      uuid: "uuid-6",
      mime_type: "image/png",
      url: "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
  },



];


const TopProductsBox = ({ queryStr }: { queryStr: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  // const productsData = useFetchData(
  //   [queryKeys.getAccountTypes],
  //   `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}${queryStr}/dashboard/top-products`,
  //   headers
  // );

  // if (productsData.isPending || productsData.isFetching) {
  //   return <></>;
  // }

  // const productsArr: productDataType[] = productsData.data.data.slice(0, 6);

  return (
    <article className="border border-[#D0D0D0] rounded-lg px-4 py-6 ">
      <BoxHeader title="Top Saving Account Types" optionsList={periodOptions} />

      <section className="flex flex-col gap-4 justify-between items-start mt-4">
        {productData.map((productData: productDataType, index: number) => {
          return (
            <ProductCard
              key={productData.productName + "--" + index}
              productData={productData}
            />
          );
        })}
      </section>
    </article>
  );
};

const ProductCard = ({ productData }: { productData: productDataType }) => {
  return (
    <article className="flex w-full">
      <section className="flex w-4/5">
        <div className="p-4">
          {/* <Image
            src={productData.product_image.url}
            alt={productData.productName}
            width={50}
            height={50}
            className="max-h-20 max-w-20 "
          /> */}
          <GiReceiveMoney size="30" />
        </div>
        <div className="pt-3">
          <p className="text-lg md:text-xl font-medium">
            {productData.productName}
          </p>
          <p className="text-lg text-[#5F5F5F]">100 Members</p>
        </div>
      </section>
      <section className="w-1/5 pt-4 text-[#5F5F5F]">
        <div className="flex justify-start items-center gap-[2%] text-[#FFAC2F]">
          {Array.from({ length: productData.rate.average }).map((_, index) => (
            <IoMdStar key={"products-rating-pid" + index} size={18} />
          ))}
        </div>
        <p className="w-full text-center pt-2">
          {productData.rate.users_count} Reviews
        </p>
      </section>
    </article>
  );
};

export default TopProductsBox;
