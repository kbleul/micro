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
import { PiXBold } from "react-icons/pi";

import CustomSelect from "@/components/ui/form/select";
import { useSession } from "next-auth/react";
import { shareType } from "types/common_types";
import { ShareOwnerSchema, ShareOwnerType } from "@/validations/share.schema";

const AddShare = () => {
  const headers = useGetHeaders({ type: "Json" });
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const shareData = useFetchData(
    [queryKeys.getShare],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}shares`,
    headers
  );

  if (shareData.isFetching) {
    return <Loading />;
  }

  const Share: shareType = shareData?.data?.data[0] ?? null;

  const initialValues: ShareOwnerType = {
    share_value: Share.share_value,
    total_shares: Share.total_shares,
    minimum_share: Share.minimum_share,
    maximum_share: Share.maximum_share,
  };

  const updateShareHandler = async (values: ShareOwnerType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}shares`,
        method: "PUT",
        headers,
        body: {
          ...values,
          price: values.share_value
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getShare],
          });

          toast.success("Share updated Successfully");
          closeModal();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="p-8 pb-28">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={ShareOwnerSchema}
        onSubmit={(values: ShareOwnerType) => updateShareHandler(values)}
      >
        {({}) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                Update Share Values
              </Title>

              <FormikInput
                name="total_shares"
                label="Total Number Of Shares"
                placeholder="Total number of shares"
                color="primary"
                className="mb-4"
                type="number"
                suffix="shares"
                isRequired
              />

              <FormikInput
                name="share_value"
                label="Share Value"
                placeholder="Enter single share value"
                color="primary"
                className="mb-4"
                type="number"
                suffix="birr"
                isRequired
              />
             

              <FormikInput
                name="minimum_share"
                label="Minimum amount of shares that can be bought"
                color="primary"
                className="mb-4"
                type="number"
                suffix="shares"
                isRequired
              />

              <FormikInput
                name="maximum_share"
                label="Maximum amount of shares that can be bought"
                color="primary"
                className="mb-4"
                type="number"
                suffix="shares"
                isRequired
              />

              {session?.user?.permissions.includes("update:share") && (
                <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                  <Button
                    color="primary"
                    className="px-10 text-white bg-primary-dark"
                    type="submit"
                    isLoading={postMutation.isPending}
                  >
                    Update
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddShare;
