"use client";

import cn from "@/utils/class-names";

import MetricCard from "@/components/cards/metric-card";

import { MdAccountBalance } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const ticketStats = [
  {
    id: 1,
    icon: <MdAccountBalance className="text-green-400" size={24} />,
    title: "Total Accounts ",
    metric: "12,450",
  },
  {
    id: 2,
    icon: <MdAccountBalance className="text-red-400" size={24} />,
    title: "Active Accounts",
    metric: "3,590",
  },
  {
    id: 3,
    icon: <MdAccountBalance className="text-blue-400" size={24} />,
    title: "Rejected Accounts",
    metric: "7,890",
  },
  {
    id: 3,
    icon: <MdAccountBalance className="text-yellow-400" size={24} />,
    title: "Pending Accounts",
    metric: "1,160",
  },
  {
    id: 1,
    icon: <FaMoneyBillTrendUp className="text-green-400" size={24} />,
    title: "Loan Requests",
    metric: "12",
  },
  {
    id: 2,
    icon: <FaMoneyBillTrendUp className="text-red-400" size={24} />,
    title: "Loans Given",
    metric: "300,00 birr",
  },
  {
    id: 3,
    icon: <FaMoneyBillTrendUp className="text-blue-400" size={24} />,
    title: "Pending Loans",
    metric: "7",
  },
  {
    id: 3,
    icon: <FaMoneyBillTrendUp className="text-yellow-400" size={24} />,
    title: "Accepted Loans",
    metric: "100",
  },
];

export default function StatCards({ className }: { className?: string }) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9", className)}
    >
      {ticketStats.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          icon={stat.icon}
          iconClassName="bg-transparent w-11 h-11"
        />
      ))}
    </div>
  );
}
