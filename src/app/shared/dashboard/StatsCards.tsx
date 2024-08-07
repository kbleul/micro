"use client";

import ExpertIcon from "@/components/icons/expert-icon";
import CenterIcon from "@/components/icons/center-icon";
import AppointmentErrorIcon from "@/components/icons/appointement-error";
import AppointmentCheckIcon from "@/components/icons/appointment-check";
import MetricCard from "@/components/cards/metric-card";

import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";

const ticketStatsMap = [
  {
    id: "ticketStatsMap-ID001",
    key: "visitors_last_month",
    icon: <AppointmentCheckIcon className="h-full w-full" />,
    title: "Last Month Visitors",
  },
  {
    id: "ticketStatsMap-ID001",
    key: "total_visitors",
    icon: <AppointmentErrorIcon className="h-full w-full" />,
    title: "Total Visitors",
  },
  {
    id: "ticketStatsMap-ID001",
    key: "leads_attracted",
    icon: <CenterIcon className="h-full w-full" />,
    title: "Leads Attracted",
  },
  {
    id: "ticketStatsMap-ID001",
    key: "store_rating",
    icon: <ExpertIcon className="h-full w-full" />,
    title: "store Rating",
  },
  {
    id: "ticketStatsMap-ID001",
    key: "discount_claimed",
    icon: <ExpertIcon className="h-full w-full" />,
    title: "discount Claimed",
  },
  {
    id: "ticketStatsMap-ID001",
    key: "active_discounted_products",
    icon: <ExpertIcon className="h-full w-full" />,
    title: "Active Discounted Products",
  },
  {
    id: "ticketStatsMap-ID001",
    key: "total_products",
    icon: <ExpertIcon className="h-full w-full" />,
    title: "Total Products",
  },
  {
    id: "ticketStatsMap-ID001",
    key: "total_packages",
    icon: <ExpertIcon className="h-full w-full" />,
    title: "Total Packages",
  },
];

const StatsCards = ({
  queryStr,
  className,
}: {
  queryStr: string;
  className?: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });

  const statsData = useFetchData(
    [queryKeys.getAccountTypes],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}${queryStr}/dashboard/counts`,

    headers
  );

  if (statsData.isPending || statsData.isFetching) {
    return <LoadingSkeleton />;
  }

  const metrics: any = statsData.data.data;
  return (
    <section className="flex gap-4 items-stretch justify-start my-4  scroll-tab-container ">
      {ticketStatsMap.map((stat) => {
        {
          return (
            stat && (
              <MetricCard
                key={stat.id}
                title={stat.title}
                metric={metrics[stat.key]}
                icon={stat.icon}
                iconClassName="bg-transparent w-11 h-11"
                className="w-4/5 md:w-1/4 flex-shrink-0 max-h-28"
                titleClassName="text-black text-lg"
              />
            )
          );
        }
      })}
    </section>
  );
};

const LoadingSkeleton = () => {
  return (
    <section className="flex gap-4 items-stretch justify-start my-4  scroll-tab-container ">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={"MetricCard-skeleton-" + index}
          className="w-4/5 md:w-1/4 flex-shrink-0 bg-[#f7f5f5] h-28 rounded-lg"
        />
      ))}
    </section>
  );
};

export default StatsCards;
