"use client";

import React from "react";
import * as Yup from "yup";

import { useGetHeaders, useGetHeadersApproval } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";

import { Formik, Form } from "formik";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import { ActionIcon, Button, Title } from "rizzui";
import { useFetchData } from "@/react-query/useFetchData";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { PiXBold } from "react-icons/pi";
import { handleFetchState } from "@/utils/fetch-state-handler";
import CustomSelect from "@/components/ui/form/select";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import FormikInput from "@/components/ui/form/input";
type RoleType = {
  roles: string[];
  name: string;
  step_number: number;
};

export const RoleSchema = Yup.object().shape({
  roles: Yup.array()
    .of(Yup.string().required(""))
    .min(1, "Atleast one role must be selected"),
  name: Yup.string().required("Name / Title is required"),
  step_number: Yup.number().required("Step number is required").min(1),
});

const AddStepForm = ({ currentWorkflowId }: { currentWorkflowId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const headersApproval = useGetHeadersApproval();
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const rolesData = useFetchData(
    [queryKeys.getAllRoles],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles`,
    headers
  );

  const fetchStateHandler = handleFetchState(rolesData, <></>);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const Roles: any[] = rolesData?.data?.data ?? [];

  const addRoleHandler = async (values: RoleType) => {
    const newRoles: { role_id: string; role_name: string }[] = [];

    values.roles.forEach((rolex) => {
      const selectedRole = Roles.find((role) => role.id == rolex);
      if (selectedRole) {
        newRoles.push({
          role_id: rolex,
          role_name: selectedRole.name,
        });
      }
    });

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_APPROVAL_BACKEND_URL}steps`,
        method: "POST",
        headers: headersApproval,
        body: {
          roles: newRoles,
          name: values.name,
          step_number: values.step_number,
          workflow_id: currentWorkflowId,
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getWorkflows + currentWorkflowId],
          });

          toast.success("Step added Successfully");
          closeModal();
        },
        onError: (err: any) => {
          handleErrorWithToast(err, toast);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues: RoleType = {
    roles: [],
    name: "",
    step_number: 1,
  };

  return (
    <article className="p-8 pb-[16rem]">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={RoleSchema}
        onSubmit={(values: RoleType) => addRoleHandler(values)}
      >
        {({ setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {"Add role"}
              </Title>

              <FormikInput
                name="name"
                label="Step Name / Title"
                placeholder="Enter name"
                color="primary"
                className=""
                isRequired
              />

              <FormikInput
                name="step_number"
                label="Step Number"
                color="primary"
                className="mt-6"
                type="number"
                isRequired
              />

              <div className="mt-4 w-full flex flex-col gap-6 col-span-2">
                <CustomSelect
                  name="roles"
                  label="Roles List"
                  options={Roles}
                  onChange={(selectedOption: { id: string }[]) => {
                    setFieldValue(
                      "roles",
                      selectedOption.flatMap((item) => item.id)
                    );
                  }}
                  placeholder="select role type"
                  getOptionValue={(role: { id: string }) => role.id}
                  getOptionLabel={(role: { name: string }) => role.name}
                  noOptionsMessage={() => "Fetching accountS types..."}
                  isLoading={rolesData.isFetching}
                  isRequired
                  isMulti
                />
              </div>

              <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                <Button
                  color="primary"
                  className="px-10 text-white bg-primary-dark"
                  type="submit"
                  isLoading={postMutation.isPending}
                >
                  {"Add"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddStepForm;
