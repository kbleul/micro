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

const CustomLineChart = ({
  analytics,
}: {
  analytics: {
    account_type_name: string;
    total_amount: number;
  }[];
}) => {
  const xAxisData = analytics.flatMap((item) => item.account_type_name);
  const yAxisData = analytics.flatMap((item) => item.total_amount);

  return (
    <article className=" rounded-lg px-4 py-6 max-h-[50vh] border w-full">
      <section className="flex justify-start items-center gap-4 pb-6 ">
        <BoxHeader title="Account Types" optionsList={[]} />
      </section>

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

export default CustomLineChart;
