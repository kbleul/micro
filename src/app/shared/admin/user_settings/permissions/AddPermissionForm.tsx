"use client";

import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/text";
import { PiXBold } from "react-icons/pi";
import { ActionIcon } from "@/components/ui/action-icon";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Spinner from "@/components/ui/spinner";
import { Form, Formik } from "formik";
import { useModal } from "@/app/shared/modal-views/use-modal";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import Loading from "@/components/ui/Loading";
import { PermissionType, permissionSchema } from "@/validations/permission.schema";
import FormikInput from "@/components/ui/form/input";

export default function AddPermissionForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const { closeModal } = useModal();

  const permissionsData = useFetchData(
    [queryKeys.getAllPermissions, id],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}user-permissions/${id}`,
    headers,
    !!id
  );

  if (permissionsData.isFetching) {
    return <Loading  />;
  }
  const initialValues: PermissionType = {
    name: id ? permissionsData?.data?.data?.name : "",
  };

  const createPermission = async (values: PermissionType) => {
    try {

        const newValues = {...values, slug: values.name}

      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}user-permissions/${id}`
          : `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}user-permissions`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPermissions],
          });
          toast.success(
            id
              ? "Permission Edited Successfully"
              : "Permission Created Successfully"
          );
          closeModal();
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          {id ? "Edit Permission" : "Add Permission"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {permissionsData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={permissionSchema}
          onSubmit={createPermission}
        >
          {() => (
            <Form className="flex flex-col items-start space-y-2">
              <FormikInput
                label="Permission Name"
                placeholder="Enter permission pame"
                color="primary"
                name="name"
              />
              <Button
                color="primary"
                className="w-full"
                type="submit"
                isLoading={postMutation.isPending}
              >
                {!id ? "Create" : "Edit"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
