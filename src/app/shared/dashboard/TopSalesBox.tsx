"use client";

import { timeSectionOptions } from "@/constants/form-constants";

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

  const salesData = useFetchData(
    [queryKeys.getSalesStats],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}${queryStr}/dashboard/sales-graph`,
    headers
  );

  if (salesData.isPending || salesData.isFetching) {
    return <></>;
  }

  const topProducts: {
    year: string;
    month: string;
    total_sales: number;
  }[] = salesData.data.data;

  const xAxisData = topProducts.flatMap((topProduct) => topProduct.month);
  const yAxisData = topProducts.flatMap((topProduct) => topProduct.total_sales);

  return (
    <article className="border border-[#D0D0D0] rounded-lg px-4 py-6 max-h-[60vh]">
      <BoxHeader title="Top Sales" optionsList={timeSectionOptions} />

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
          width={"100%"}
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
