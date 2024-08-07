"use client";



import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import BoxHeader from "./BoxHeader";
import { periodOptions } from "@/utils/dummy";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,

  maintainAspectRatio: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const TopSalesBox = ({ queryStr }: { queryStr: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  // const salesData = useFetchData(
  //   [queryKeys.getAccountTypes],
  //   `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}${queryStr}/dashboard/sales-graph`,
  //   headers
  // );

  // if (salesData.isPending || salesData.isFetching) {
  //   return <></>;
  // }

  const topProducts: {
    year: string;
    month: string;
    total_sales: number;
  }[] = [
    {
      year: "2022",
      month: "January",
      total_sales: 5000,
    },
    {
      year: "2022",
      month: "February",
      total_sales: 4500,
    },
    {
      year: "2022",
      month: "March",
      total_sales: 6000,
    },
    {
      year: "2022",
      month: "April",
      total_sales: 5500,
    },
    {
      year: "2022",
      month: "May",
      total_sales: 6500,
    },
    {
      year: "2022",
      month: "June",
      total_sales: 7000,
    },
    {
      year: "2022",
      month: "July",
      total_sales: 6200,
    },
    {
      year: "2022",
      month: "August",
      total_sales: 6800,
    },
    {
      year: "2022",
      month: "September",
      total_sales: 7500,
    },

  ];

  const xAxisData = topProducts.flatMap((topProduct) => topProduct.month);
  const yAxisData = topProducts.flatMap((topProduct) => topProduct.total_sales);

  return (
    <article className=" rounded-lg px-4 py-6 max-h-[50vh]">
      <BoxHeader title="Transactions" optionsList={periodOptions} />

      <section className="w-full h-full ">
        <Bar
          data={{
            labels: xAxisData,
            datasets: [
              {
                data: yAxisData,
                backgroundColor: "#2572ED",
                barPercentage: 0.5,
                maxBarThickness: yAxisData.length > 6 ? 10 : 24,
                borderRadius: 5,
              },
            ],
          }}
          width={"140%"}
          height={"100%"}
          options={{
            ...options,
            indexAxis: "x",
            plugins: {
              ...options.plugins,
            },
          }}
          className="h-full"
        />
      </section>

      {/*  */}
    </article>
  );
};

export default TopSalesBox;
