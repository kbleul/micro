"use client";

import React, { useEffect, useState } from "react";
import { useGetHeadersApproval } from "@/hooks/use-get-headers";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import { useSession } from "next-auth/react";
import useDynamicMutation from "@/react-query/usePostData";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";
import Link from "next/link";

const RequestsList = () => {
  const { data: session } = useSession();
  const postMutation = useDynamicMutation();

  const headers = useGetHeadersApproval();

  const [tasks, setTasks] = useState<any>(null);

  const pageHeader = {
    title: "Branches",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        name: "Approval Requests",
      },
    ],
  };

  const fetchTasks = async () => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_APPROVAL_BACKEND_URL}filter/tasks`,
        method: "POST",
        headers,
        body: {
          roles: [
            {
              role_id: "string",
              role_name: "string",
            },
          ],
          user_id: "9ca540fa-c357-4256-9cfd-2d7d6d9466f4",
        },
        onSuccess: (res: any) => {
          setTasks(res?.data?.tasks);
        },
        onError: (err: any) => {
          handleErrorWithToast(err, toast);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprove = (isApprove: boolean) => {
    toast.success(
      isApprove ? "Task approved successfully" : "Task rejected successfully"
    );

    const tempTasks = [...tasks];
    tempTasks.pop();
    setTasks(tempTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <article className="">
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      {!tasks && (
        <div className="pt-20 flex justify-center items-center">
          <Loading />
        </div>
      )}

      {tasks && tasks.length === 0 && (
        <div className="pt-20 flex justify-center items-center">
          <p className="text-2xl font-medium text-center">
            No more approval requests !
          </p>
        </div>
      )}

      {tasks && tasks.length !== 0 && (
        <article className="h-[80vh] flex items-center flex-col py-10 overflow-hidden hover:overflow-y-scroll">
          {tasks.map((task: any, index: number) => (
            <section
              key={task.id + "approval-request" + index}
              className={`w-4/5 border py-3 text-left px-5 rounded-lg bg-gray-50 `}
            >
              <div className="">
                <p className="text-xl font-semibold">{task?.workflow?.name}</p>
                <p className=" line-clamp-1">{task?.description}</p>

                <p className="mt-2 line-clamp-1 font-medium text-lg">
                  {task?.workflow?.description}
                </p>
              </div>

              <div className="flex gap-6 justify-end items-center px-10">
                <button
                  className="border px-10 py-2 hover:opacity-80 border-black text-black font-semibold rounded-lg"
                  type="button"
                >
                  <Link
                    href={routes.home.members["view-member-account"](
                      "630cb49e-e47a-4246-bf5a-042bac7a0de8",
                      "7103288d-63fc-4b4e-9062-1f6ba1ef51f5"
                    )}
                  >
                    View User
                  </Link>
                </button>
                <button
                  className="border px-10 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg"
                  type="button"
                  onClick={() => handleApprove(true)}
                >
                  Reject
                </button>
                <button
                  className="border px-10 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg"
                  type="button"
                  onClick={() => handleApprove(false)}
                >
                  Approve
                </button>
              </div>
            </section>
          ))}
        </article>
      )}
    </article>
  );
};

export default RequestsList;
