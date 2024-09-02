"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import BoxHeader from "./BoxHeader";

const COLORS = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F", "#32a852", "#de5f9d", "#de5f9d", "#7dde5f"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: string;
  cy: string;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChartAccount = ({
  analytics,
}: {
  analytics: { account_type_name: string; count: number }[];
}) => {
  const data = analytics.map((item) => ({
    name: item.account_type_name,
    value: item.count,
  }));

  return (
    <article className="border rounded-lg w-full px-4 py-2  flex flex-col justify-center items-center h-[35vh]">
      <div className="self-start">
        <BoxHeader title="Account Types" optionsList={[]} />
      </div>

      <section className="grid grid-cols-2 justify-start items-center gap-4 pt-6 min-h-28">
        {analytics.map((item, index) => (
          <div
            className="flex justify-start items-center gap-2 capitalize"
            key={item.count + index}
          >
            <p
              className="w-4 h-4 "
              style={{
                backgroundColor: COLORS[index],
              }}
            >
              {}
            </p>
            <p>{item.account_type_name}</p>
          </div>
        ))}
      </section>
      <ResponsiveContainer width="70%" height="70%">
        <PieChart width={1800} height={1800}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </article>
  );
};

export default CustomPieChartAccount;
