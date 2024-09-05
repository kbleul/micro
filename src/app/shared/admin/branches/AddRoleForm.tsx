"use client";
import React from "react";
import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";

import { Formik, Form } from "formik";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import { ActionIcon, Button, Title } from "rizzui";
import { useFetchData } from "@/react-query/useFetchData";
import { useModal } from "@/app/shared/modal-views/use-modal";
import Loading from "@/components/ui/Loading";
import { RoleType, RoleSchema } from "@/validations/role.schema";
import { PiXBold } from "react-icons/pi";
import { handleErrorWithToast } from "@/utils/error-toast-handler";

const AddRoleForm = ({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) => {
  const headers = useGetHeaders({ type: "FormData" });
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const rolesData = useFetchData(
    [queryKeys.getAllRoles + id, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles/show/${id}`,
    headers,
    !!id
  );

  if (rolesData.isFetching) {
    return <Loading />;
  }

  const initialValues: RoleType = {
    name: id ? rolesData.data.data.role.name : "",
  };

  const createROleSubmitHandler = async (values: RoleType) => {
    try {
      const newValues = { ...values, Slug: values.name };
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles/${id}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          _method: id ? "PATCH" : "POST",
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllRoles],
          });

          toast.success(
            id ? "Role updated Successfully" : "Role created Successfully"
          );
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

  return (
    <article className="p-8">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={RoleSchema}
        onSubmit={(values: RoleType) => createROleSubmitHandler(values)}
      >
        {({}) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {id ? "Edit role" : "Add role"}
              </Title>

              <FormikInput
                name="name"
                label="Role Name"
                placeholder="Enter the role name"
                color="primary"
                className=""
                isRequired
              />

              <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                <Button
                  color="primary"
                  className="px-10 text-white bg-primary-dark"
                  type="submit"
                  isLoading={postMutation.isPending}
                >
                  {id ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddRoleForm;
