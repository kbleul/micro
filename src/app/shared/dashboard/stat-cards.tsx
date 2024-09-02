"use client";

import cn from "@/utils/class-names";

import MetricCard from "@/components/cards/metric-card";

import { MdAccountBalance } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export default function StatCards({
  className,
  analytics,
}: {
  className?: string;
  analytics: any;
}) {
  const ticketStats = [
    {
      id: 1,
      icon: <MdAccountBalance className="text-green-400" size={24} />,
      title: "Total Members ",
      metric: analytics?.total_number_of_members,
    },
    {
      id: 1,
      icon: <MdAccountBalance className="text-green-400" size={24} />,
      title: "Total Accounts ",
      metric: analytics?.total_number_of_accounts,
    },
    {
      id: 2,
      icon: <MdAccountBalance className="text-red-400" size={24} />,
      title: "Active Accounts",
      metric: analytics?.total_number_of_active_accounts,
    },
    {
      id: 3,
      icon: <MdAccountBalance className="text-blue-400" size={24} />,
      title: "total Branches",
      metric: analytics?.total_number_of_branches,
    },
    {
      id: 1,
      icon: <FaMoneyBillTrendUp className="text-green-400" size={24} />,
      title: "Loan Requests",
      metric: analytics?.total_number_of_loan_request,
    },
    {
      id: 2,
      icon: <FaMoneyBillTrendUp className="text-red-400" size={24} />,
      title: "Loans Disbursed",
      metric: analytics?.total_number_of_disbursed_loans,
    },
  ];

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
