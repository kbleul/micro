"use client";

import React, { useEffect } from "react";
import { Title } from "rizzui";
import { workflowType } from "types/common_types";

const LeftSectionPresetup = ({
  workflows,
  currentWorkflow,
  setCurrentWorkflow,
}: {
  workflows: workflowType[];
  currentWorkflow: workflowType | null;
  setCurrentWorkflow: React.Dispatch<React.SetStateAction<workflowType | null>>;
}) => {
  useEffect(() => {
    !currentWorkflow && setCurrentWorkflow(workflows[0]);
  }, [currentWorkflow]);

  return (
    <article className={`w-full h-[90vh] overflow-y-hidden  border ${workflows.length > 10 && "hover:overflow-y-scroll"} bg-gray-50  py-6 col-span-1`}>
      <Title as="h6" className="border-b mb-6 pb-6 px-4 font-medium text-2xl">
        Workflows
      </Title>

      <section className="flex flex-col items-center gap-y-10 py-10 px-4">
        {workflows.map((workflow) => (
          <button
            key={workflow.id}
            className={`w-[90%] border py-3 text-left px-5 rounded-lg hover:opacity-70 ${workflow.id === currentWorkflow?.id && "bg-primary-dark text-white"}`}
            type="button"
            onClick={() => setCurrentWorkflow(workflow)}
          >
            <p className="font-medium text-xl">{workflow.name}</p>
            <p className="mt-2">{workflow.description}</p>
          </button>
        ))}
      </section>
    </article>
  );
};

export default LeftSectionPresetup;
