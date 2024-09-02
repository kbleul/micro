"use client";

import React from "react";
import * as Yup from "yup";

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
import { PiXBold } from "react-icons/pi";
import { handleFetchState } from "@/utils/fetch-state-handler";
import CustomSelect from "@/components/ui/form/select";
type AccountType = {
  balance: number;
  type_id: string;
};

export const AccountSchema = Yup.object().shape({
  balance: Yup.number().min(0).required("Initial balance is required"),
  type_id: Yup.string().required("Account type is required"),
});


const AddAccountForm = ({ memberId }: { memberId?: string }) => {
  const headers = useGetHeaders({ type: "FormData" });
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const accountTypesData = useFetchData(
    [queryKeys.getAccountTypes],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types`,
    headers
  );

  const fetchStateHandler = handleFetchState(accountTypesData, <></>);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const Types: any[] = accountTypesData?.data?.data?.accountTypes ?? null;

  const createAccountHandler = async (values: AccountType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}accounts`,
        method: "POST",
        headers,
        body: {
          ...values,
          member_id: memberId,
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllUsers + memberId],
          });

          toast.success("Account created Successfully");
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

  const initialValues: AccountType = {
    balance: 0,
    type_id: "",
  };

  return (
    <article className="p-8 pb-40">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={AccountSchema}
        onSubmit={(values: AccountType) => createAccountHandler(values)}
      >
        {({ setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {"Add account"}
              </Title>

              <FormikInput
                name="balance"
                label="Initail Deposit"
                placeholder="Enter the initail  deposit"
                color="primary"
                className=""
                type="number"
                isRequired
              />

              <div className="mt-4 w-full flex flex-col gap-6 col-span-2">
                <CustomSelect
                  name="type_id"
                  label="Account Types"
                  options={Types}
                  onChange={(selectedOption: { id: string }) => {
                    setFieldValue("type_id", selectedOption.id);
                  }}
                  placeholder="select account type"
                  getOptionValue={(type: { id: string }) => type.id}
                  getOptionLabel={(type: { name: string }) => type.name}
                  noOptionsMessage={() => "Fetching accountS types..."}
                  isLoading={accountTypesData.isFetching}
                  isRequired
                />
              </div>

              <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                <Button
                  color="primary"
                  className="px-10 text-white bg-primary-dark"
                  type="submit"
                  isLoading={postMutation.isPending}
                >
                  {"Create"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddAccountForm;
