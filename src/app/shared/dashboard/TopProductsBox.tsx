"use client";

import { timeSectionOptions } from "@/constants/form-constants";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import BoxHeader from "./BoxHeader";

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

const TopProductsBox = ({ queryStr }: { queryStr: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const productsData = useFetchData(
    [queryKeys.getTopProductsStats],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}${queryStr}/dashboard/top-products`,
    headers
  );

  if (productsData.isPending || productsData.isFetching) {
    return <></>;
  }

  const productsArr: productDataType[] = productsData.data.data.slice(0, 6);

  return (
    <article className="border border-[#D0D0D0] rounded-lg px-4 py-6 ">
      <BoxHeader title="Top Products" optionsList={timeSectionOptions} />

      <section className="flex flex-col gap-4 justify-between items-start mt-4">
        {productsArr.map((productData: productDataType, index: number) => {
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
          <Image
            src={productData.product_image.url}
            alt={productData.productName}
            width={50}
            height={50}
            className="max-h-20 max-w-20 "
          />
        </div>
        <div className="pt-3">
          <p className="text-lg md:text-xl font-medium">
            {productData.productName}
          </p>
          <p className="text-lg text-[#5F5F5F]">ETB {productData.price}</p>
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
