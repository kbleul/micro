"use client";

import cn from "@/utils/class-names";

import MetricCard from "@/components/cards/metric-card";

import ExpertIcon from "@/components/icons/expert-icon";
import CenterIcon from "@/components/icons/center-icon";
import AppointmentErrorIcon from "@/components/icons/appointement-error";
import AppointmentCheckIcon from "@/components/icons/appointment-check";

const ticketStats = [
  {
    id: 1,
    icon: <AppointmentCheckIcon className="h-full w-full" />,
    title: "completed ",
    metric: "12,450",
  },
  {
    id: 2,
    icon: <AppointmentErrorIcon className="h-full w-full" />,
    title: "Canceled ",
    metric: "3,590",
  },
  {
    id: 3,
    icon: <CenterIcon className="h-full w-full" />,
    title: "Total Centers",
    metric: "7,890",
  },
  {
    id: 3,
    icon: <ExpertIcon className="h-full w-full" />,
    title: "Total Centers",
    metric: "1,160",
  },
  {
    id: 1,
    icon: <AppointmentCheckIcon className="h-full w-full" />,
    title: "completed ",
    metric: "12,450",
  },
  {
    id: 2,
    icon: <AppointmentErrorIcon className="h-full w-full" />,
    title: "Canceled ",
    metric: "3,590",
  },
  {
    id: 3,
    icon: <CenterIcon className="h-full w-full" />,
    title: "Total",
    metric: "7,890",
  },
  {
    id: 3,
    icon: <ExpertIcon className="h-full w-full" />,
    title: "Total",
    metric: "1,160",
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
