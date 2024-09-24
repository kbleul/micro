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
import { useModal } from "@/app/shared/modal-views/use-modal";

import { PiXBold } from "react-icons/pi";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { ShareSchema, ShareType } from "@/validations/share.schema";
import CustomSelect from "@/components/ui/form/select";
import { paymentChannels, paymentChannelsOptions } from "@/utils/dummy";

const BuyShare = ({ member_id }: { member_id?: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const buySubmitHandler = async (values: ShareType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}shares/buy`,
        method: "POST",
        headers,
        body: {
          ...values,
          member_id,
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllUsers + member_id],
          });

          toast.success("Share bought Successfully");
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

  const initialValues: ShareType = {
    number_of_shares: 1,
    payment_channel: null,
    cheque_number: null,
  };

  return (
    <article className="p-8 pb-36">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={ShareSchema}
        onSubmit={(values) => buySubmitHandler(values)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                Buy Share
              </Title>

              <FormikInput
                name="number_of_shares"
                label="Number of shares"
                type="number"
                placeholder="Enter share amount"
                color="primary"
                className=""
                isRequired
              />

              <div className="mt-4 w-full flex flex-col gap-6 ">
                <CustomSelect
                  isSearchable
                  name="payment_channel"
                  label="Payment Channel"
                  options={paymentChannelsOptions}
                  onChange={(selectedOption: { value: string }) => {
                    setFieldValue("payment_channel", selectedOption.value);
                  }}
                  placeholder="select payment channels"
                  getOptionValue={(period: { value: string }) => period.value}
                  getOptionLabel={(period: { value: string }) => period.value}
                  noOptionsMessage={() => "Fetching payment channels..."}
                  isRequired
                />
              </div>

              {values.payment_channel === paymentChannels.cheque && (
                <FormikInput
                  name="cheque_number"
                  label="Cheque Number"
                  color="primary"
                  className="col-span-2 md:col-span-1 w-full mt-2"
                  labelClassName="pb-2"
                  isRequired
                />
              )}

              <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                <Button
                  color="primary"
                  className="px-10 text-white bg-primary-dark"
                  type="submit"
                  isLoading={postMutation.isPending}
                >
                  Buy
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default BuyShare;
