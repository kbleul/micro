"use client";

import React, { useState } from "react";
import { useGetHeadersApproval } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import LeftSectionPresetup from "./LeftSection";
import RightSectionPresetup from "./RightSection";
import { workflowType } from "types/common_types";
import { handleFetchState } from "@/utils/fetch-state-handler";

const ApprovalPresetup = () => {
  const headers = useGetHeadersApproval();

  const [currentWorkflow, setCurrentWorkflow] = useState<workflowType | null>(
    null
  );

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
    <article className="grid grid-cols-3 poppins">
      <LeftSectionPresetup
        workflows={Workflows}
        currentWorkflow={currentWorkflow}
        setCurrentWorkflow={setCurrentWorkflow}
      />
      <RightSectionPresetup
        currentWorkflow={currentWorkflow}
        setCurrentWorkflow={setCurrentWorkflow}
      />
    </article>
  );
};

export default ApprovalPresetup;
