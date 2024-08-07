import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React from "react";

import { Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import { SlCalender } from "react-icons/sl";

const UpcommingAppointments = ({ clientId }: { clientId: string }) => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const appointments = useFetchData(
    [queryKeys.getAccountTypes + clientId, clientId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-upcoming-appointments/${clientId}`,
    headers
  );

  if (appointments.isPending || appointments.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const upcommingAppointments = appointments?.data?.data?.data;

  return (
    <article>
      {upcommingAppointments && upcommingAppointments.length === 0 && (
        <section className="mt-10 w-full flex justify-center">
          <Title as="h6">No upcomming appointments found for client!</Title>
        </section>
      )}

      <article className="flex items-center justify-start flex-wrap gap-[5%]">
        {upcommingAppointments &&
          upcommingAppointments.length > 0 &&
          upcommingAppointments.map((appointment: any) => (
            <section
              key={appointment.id}
              className="mt-4 px-8 shadow-md  w-[45%] py-4 gap-4 border-t rounded-md"
            >
              <Title as="h5" className="">
                {appointment.user.first_name}
              </Title>

              <div className="flex justify-start items-center text-sm mt-2">
                <div className="pr-2 border-r flex items-center justify-center gap-2">
                  <SlCalender />
                  <p className="">{appointment.date}</p>
                </div>
                <p className="px-3">{appointment.time}</p>
              </div>
            </section>
          ))}
      </article>
    </article>
  );
};

export default UpcommingAppointments;
