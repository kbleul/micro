"use client";

import React, { useEffect, useState } from "react";
import { useGetHeaders, useGetHeadersApproval } from "@/hooks/use-get-headers";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import { useSession } from "next-auth/react";
import useDynamicMutation from "@/react-query/usePostData";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import { IoIosArrowForward } from "react-icons/io";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { memberType, workflowType } from "types/common_types";
import Link from "next/link";

export const CategoriesArr = ["Loan"];

const RequestsList = () => {
  const headers = useGetHeadersApproval();

  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

  const pageHeader = {
    title: "Approval Requests",
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

  const workflowData = useFetchData(
    [queryKeys.getWorkflows],
    `${process.env.NEXT_PUBLIC_APPROVAL_BACKEND_URL}applications/${process.env.NEXT_PUBLIC_APPROVAL_APP_KEY}/workflows`,
    headers
  );

  const fetchStateHandler = handleFetchState(workflowData, <></>);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const Workflows: workflowType[] =
    workflowData?.data?.data?.applicationWorkflows?.workflows ?? [];

  return (
    <article className="">
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />

      <div className="mt-10">
        <CustomCategoryButton
          categoryLink={categoryLink}
          setCategoryLink={setCategoryLink}
          categoriesArr={CategoriesArr}
          labels={CategoriesArr}
        />
      </div>

      <ViewTasks categoryLink={categoryLink} Workflows={Workflows} />
    </article>
  );
};

const ViewTasks = ({
  categoryLink,
  Workflows,
}: {
  categoryLink: string;
  Workflows: workflowType[];
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeadersApproval();
  const { data: session } = useSession();

  const [tasks, setTasks] = useState<any>(null);
  const [showDetailsFor, setShowDetailsFor] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_APPROVAL_BACKEND_URL}filter/tasks?type=${Workflows.find((workflow) => workflow.name.includes(categoryLink))?.id}`,
        method: "POST",
        headers,
        body: {
          roles: [
            {
              role_id: session?.user?.user?.roles[0].id,
              role_name: session?.user?.user?.roles[0].name,
            },
          ],
          user_id: session?.user?.user?.id,
        },
        onSuccess: (res: any) => {
          setTasks(res?.data?.tasks?.filter((task: any) => task.status === "pending"));
        },
        onError: (err: any) => {
          handleErrorWithToast(err, toast);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [categoryLink]);

  return (
    <>
      {!tasks && (
        <div className="pt-20 flex justify-center items-center">
          <Loading />
        </div>
      )}

      {tasks && (
        <>
          {tasks.length === 0 ? (
            <div className="pt-20 flex justify-center items-center">
              <p className="text-2xl font-medium text-center">
                No approval requests for now !
              </p>
            </div>
          ) : (
            <article className="flex items-center flex-col py-10 overflow-hidden">
              {tasks.map((task: any, index: number) => (
                <ResuestCard
                  index={index}
                  task={task}
                  categoryLink={categoryLink}
                  currentStep={task.current_step.step_number}
                  showDetailsFor={showDetailsFor}
                  setShowDetailsFor={setShowDetailsFor}
                  setTasks={setTasks}
                />
              ))}
            </article>
          )}
        </>
      )}
    </>
  );
};

const ResuestCard = ({
  index,
  task,
  categoryLink,
  currentStep,
  showDetailsFor,
  setShowDetailsFor,
  setTasks,
}: {
  index: number;
  task: any;
  categoryLink: string;
  currentStep: number;
  showDetailsFor: string | null;
  setShowDetailsFor: React.Dispatch<React.SetStateAction<string | null>>;
  setTasks: React.Dispatch<any>;
}) => {
  const postMutation = useDynamicMutation();
  const { data: session } = useSession();
  const headers = useGetHeadersApproval();

  const handleApprove = async (isApprove: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_APPROVAL_BACKEND_URL}tasks/approve`,
        method: "POST",
        headers,
        body: {
          comments: "string",
          result: isApprove,

          roles: [
            {
              role_id: session?.user?.user?.roles[0].id,
              role_name: session?.user?.user?.roles[0].name,
            },
          ],
          user_id: session?.user?.user?.id,
          task_id: task?.id,
        },
        onSuccess: (res: any) => {
          // queryClient.invalidateQueries({
          //   queryKey: [queryKeys.getWorkflows + currentWorkflow?.id],
          // });

          setTasks((prev: any) =>
            prev ? prev.filter((T: any) => T.id !== task.id) : null
          );

          toast.success(categoryLink + " Approved Successfully");
        },
        onError: (err: any) => {
          handleErrorWithToast(err, toast);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      key={task.id + "approval-request" + index}
      className={`w-[90%] border py-3 text-left px-5 rounded-lg bg-gray-50 mb-4`}
    >
      <div className="">
        <p className="text-xl font-semibold">{task?.workflow?.name}</p>
        <p className=" line-clamp-1">{task?.description}</p>
      </div>

      {showDetailsFor && showDetailsFor === task.id && (
        <ApprovalDetails
          task={task}
          currentStep={currentStep}
          categoryLink={categoryLink}
        />
      )}

      <div className="flex gap-6 justify-end items-center px-10">
        <button
          className="border px-5 py-1 bg-red-500 hover:bg-red-700 text-white disabled:opacity-60 font-semibold rounded-lg"
          type="button"
          disabled={postMutation.isPending}
          onClick={() => handleApprove("rejected")}
        >
          Reject
        </button>
        <button
          className="border px-5 py-1 bg-green-500 hover:bg-green-700 text-white disabled:opacity-60 font-semibold rounded-lg"
          type="button"
          disabled={postMutation.isPending}
          onClick={() => handleApprove("approved")}
        >
          Approve
        </button>
        <Link
          href={
            routes.home.members["view-member-account"](
              task?.data?.account?.member_id,
              task?.data?.account_id
            ) + "?action=loan"
          }
        >
          <button
            className={`border px-5 py-1 hover:opacity-60 border-black text-black font-semibold rounded-lg flex items-center gap-2`}
            type="button"
          >
            <p className="">View Details</p>
            <IoIosArrowForward size={20} className={`text-gray-700 `} />
          </button>
        </Link>
      </div>
    </section>
  );
};

const ApprovalDetails = ({
  task,
  currentStep,
  categoryLink,
}: {
  task: any;
  currentStep: number;
  categoryLink: string;
}) => {
  return (
    <article className="pt-8">
      <section className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p className="font-medium text-base mb-4">
            Total Approval Steps:{" "}
            <span className="font-bold">{task?.workflow?.steps.length}</span>
          </p>
        </div>
        <div className="col-span-2">
          {categoryLink === CategoriesArr[0] ? (
            <MemberDetails memberId={task?.data?.id} />
          ) : (
            <LoanDetails
              memberId={task?.data?.id}
              loanApplicationId={task?.data?.id}
            />
          )}
        </div>
      </section>
    </article>
  );
};

const MemberDetails = ({ memberId }: { memberId: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const memberData = useFetchData(
    [queryKeys.getAllUsers + memberId, memberId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}members/${memberId}`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    memberData,
    <></>,
    "max-h-[20vh] flex justify-center items-center"
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const MemberInfo: memberType = memberData.data.data;

  return (
    <article className="pb-12">
      <section className="">
        <p className="font-medium text-base mb-4 border-b w-full">
          Member Information
        </p>
        <section className="grid grid-cols-3 gap-4 text-sm">
          <div className="col-span-3">
            <p className="font-medium mb-1 text-xs">Full Name</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {MemberInfo?.full_name}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Age</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {MemberInfo?.age}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Gender</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {MemberInfo?.gender}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Marriage Status</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {MemberInfo?.marriage_status}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Phone</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              +{MemberInfo?.phone_number}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Monthly Income</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {MemberInfo?.monthly_income}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Region</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {MemberInfo?.current_region}
            </p>
          </div>
        </section>
      </section>
    </article>
  );
};

const LoanDetails = ({
  memberId,
  loanApplicationId,
}: {
  memberId: string;
  loanApplicationId: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });

  const memberData = useFetchData(
    [queryKeys.getAllUsers + memberId, memberId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}members/${memberId}`,
    headers
  );

  const loanData = useFetchData(
    [queryKeys.getLoanRequests + loanApplicationId, loanApplicationId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}loan-applications/${loanApplicationId}`,
    headers
  );

  const fetchStateHandlerMember = handleFetchState(
    memberData,
    <></>,
    "max-h-[20vh] flex justify-center items-center"
  );

  const fetchStateHandlerLoan = handleFetchState(
    loanData,
    <></>,
    "max-h-[20vh] flex justify-center items-center"
  );

  if (fetchStateHandlerMember) {
    return fetchStateHandlerMember;
  }

  if (fetchStateHandlerLoan) {
    return fetchStateHandlerLoan;
  }

  const MemberInfo: memberType = memberData.data.data;

  const loanInfo: any = loanData.data.data;

  return (
    <article className="pb-12">
      <section className="">
        <p className="font-medium text-base mb-4 border-b w-full">
          Member and Loan Request Information
        </p>
        <section className="grid grid-cols-3 gap-4 text-sm">
          <div className="col-span-3">
            <p className="font-medium mb-1 text-xs">Full Name</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {MemberInfo?.full_name}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Age</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {loanInfo?.age}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Gender</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {loanInfo?.gender}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Marriage Status</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {loanInfo?.marriage_status}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Phone</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              +{loanInfo?.phone_number}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Monthly Income</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {loanInfo?.monthly_income}
            </p>
          </div>

          <div className="">
            <p className="font-medium mb-1 text-xs">Region</p>
            <p className="border rounded-md border-black p-2 capitalize font-medium">
              {loanInfo?.current_region}
            </p>
          </div>
        </section>
      </section>
    </article>
  );
};

export default RequestsList;
