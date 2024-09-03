"use client";

import { useModal } from "@/app/shared/modal-views/use-modal";
import { useGetHeadersApproval } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { handleFetchState } from "@/utils/fetch-state-handler";
import React from "react";
import { Button, Title } from "rizzui";
import { workflowStepType, workflowType } from "types/common_types";
import AddRoleForm from "./AddRoleForm";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import AddStepForm from "./AddStepForm";
import { MdOutlineDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";

const RightSectionPresetup = ({
  currentWorkflow,
  setCurrentWorkflow,
}: {
  currentWorkflow: workflowType | null;
  setCurrentWorkflow: React.Dispatch<React.SetStateAction<workflowType | null>>;
}) => {
  const { openModal } = useModal();

  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const headers = useGetHeadersApproval();

  const workflowData = useFetchData(
    [queryKeys.getWorkflows + currentWorkflow?.id],
    `${process.env.NEXT_PUBLIC_APPROVAL_BACKEND_URL}steps/${currentWorkflow?.id}`,
    headers,
    currentWorkflow ? true : false
  );

  if (!currentWorkflow) return <p>Select workflow</p>;

  const fetchStateHandler = handleFetchState(workflowData, <></>);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const WorkflowDetails: workflowStepType[] = workflowData?.data?.data?.steps;

  const handleDelete = async (stepId: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_APPROVAL_BACKEND_URL}steps/${stepId}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getWorkflows + currentWorkflow?.id],
          });

          toast.success("Step removed Successfully");
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
    <article className={`w-full h-[90vh] overflow-y-hidden  border border-l-0  ${WorkflowDetails.length > 3 && "hover:overflow-y-scroll"}  border col-span-2 py-6`}>
      <Title as="h6" className="border-b mb-6 pb-6 px-4 font-medium text-2xl">
        Steps
      </Title>

      <section className="flex flex-col items-center gap-y-4 py-6">
        {WorkflowDetails.map((step) => (
          <div
            key={step.id}
            className={`w-4/5 border py-2 text-left px-5 rounded-lg`}
          >
            <div className="flex justify-end w-full">
              <button
                type="button"
                className="flex justify-center items-center bg-red-400 w-9 h-9 rounded-full"
                onClick={() => handleDelete(step.id)}
              >
                <MdOutlineDelete className="text-white" size={22} />
              </button>
            </div>

            <div className="flex justify-start items-center gap-3 text-lg font-medium">
              <p className="">Step {step.step_number}</p>
              <p>- {step.name}</p>
            </div>

            <div className="mt-6 py-4 border-t">
              <Title as="h6" className="pt-2  font-medium text-lg">
                Roles
              </Title>

              <div className="grid grid-cols-4 justify-start items-center gap-2 mt-3">
                {step.roles &&
                  step.roles.map((role) => (
                    <p
                      key={role.id + "--steps" + role.role_id}
                      className="border rounded-2xl text-sm text-center w-fit px-6 py-1 pt-"
                    >
                      {role.role_name}
                    </p>
                  ))}
                <button
                  className="w-8 h-8  flex justify-center items-center"
                  onClick={() =>
                    openModal({
                      view: (
                        <AddRoleForm
                          roles={step.roles ?? []}
                          step_id={step.id}
                          currentWorkflowId={currentWorkflow.id}
                        />
                      ),
                    })
                  }
                >
                  <CiCirclePlus size={50} className="text-primary-dark" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="w-full flex items-center justify-center gap-4 mt-10">
        <Button
          type="button"
          className="px-16 bg-primary-dark"
          onClick={() =>
            openModal({
              view: <AddStepForm currentWorkflowId={currentWorkflow.id} />,
            })
          }
        >
          Add New Step
        </Button>
      </div>
    </article>
  );
};

export default RightSectionPresetup;
