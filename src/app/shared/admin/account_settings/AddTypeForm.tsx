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

import { periodOptions } from "@/utils/dummy";
import CustomSelect from "@/components/ui/form/select";
import { useSession } from "next-auth/react";
import {
  InterstTermSchema,
  InterstTypeType,
} from "@/validations/account_type.schema";
import { handleErrorWithToast } from "@/utils/error-toast-handler";

const AddTypeForm = ({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const interstTermsData = useFetchData(
    [queryKeys.getInterstTerms, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}interest-terms`,
    headers
  );

  const typesData = useFetchData(
    [queryKeys.getAccountTypes + id, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types/${id}`,
    headers,
    !!id
  );

  if (typesData.isFetching || interstTermsData.isFetching) {
    return <Loading />;
  }

  const initialValues: InterstTypeType = {
    name: "",
    minimum_threshold: 0,
    interest_period: "",
    interest_rate: 0,
    saving_period: "",
    penalty_rate: 0,
  };

  const createTermSubmitHandler = async (values: InterstTypeType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types/${id}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types`,
        method: "POST",
        headers,
        body: {
          ...values,
          minimumthreshold: values.minimum_threshold,
          _method: id ? "PATCH" : "POST",
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAccountTypes],
          });

          toast.success(
            id
              ? "Account type updated Successfully"
              : "Account type created Successfully"
          );
          closeModal();
        },
        onError: (err: any) => {
          handleErrorWithToast(err, toast);

          // toast.error(err?.response?.data?.data);
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
        validationSchema={InterstTermSchema}
        onSubmit={(values: InterstTypeType) => createTermSubmitHandler(values)}
      >
        {({ setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {id ? "Edit Account Type" : "Add Account Type"}
              </Title>

              <FormikInput
                name="name"
                label="Account type"
                placeholder="Enter the term name"
                color="primary"
                className="mt-6"
                isRequired
              />

              <FormikInput
                name="minimum_threshold"
                label="Minimum Threshold"
                placeholder="Enter the minumum threshold"
                color="primary"
                className="mt-6"
                type="number"
                isRequired
              />
              <div className="mt-6 w-full flex flex-col gap-6 ">
                <CustomSelect
                  isSearchable
                  name="interest_period"
                  label="Interest Period"
                  options={periodOptions}
                  onChange={(selectedOption: { value: string }) => {
                    setFieldValue("interest_period", selectedOption.value);
                  }}
                  placeholder="select period"
                  getOptionValue={(interest_period: any) => interest_period?.id}
                  getOptionLabel={(interest_period: any) =>
                    interest_period?.name
                  }
                  noOptionsMessage={() => "Fetching periods..."}
                  defaultValue={interstTermsData?.data?.data?.interestTerms.filter(
                    (p: any) => p.id === typesData?.data?.data?.interest_period
                  )}
                  isRequired
                />
              </div>

              <FormikInput
                name="interest_rate"
                label="Interest Rate"
                placeholder="Enter the intrest rate"
                color="primary"
                className="mt-6"
                suffix="%"
                type="number"
                isRequired
              />

              <div className="mt-8 w-full flex flex-col gap-6 ">
                <CustomSelect
                  isSearchable
                  name="saving_period"
                  label="Saving Period"
                  options={periodOptions}
                  onChange={(selectedOption: { value: string }) => {
                    setFieldValue("saving_period", selectedOption.value);
                  }}
                  placeholder="select period"
                  getOptionValue={(saving_period: any) => saving_period?.id}
                  getOptionLabel={(saving_period: any) => saving_period?.name}
                  noOptionsMessage={() => "Fetching periods..."}
                  defaultValue={interstTermsData?.data?.data?.interestTerms.filter(
                    (p: any) => p.id === typesData?.data?.data?.saving_period
                  )}
                  isRequired
                />

                <FormikInput
                  name="penalty_rate"
                  label="Penality Rate"
                  placeholder="Enter the penality rate"
                  color="primary"
                  className=""
                  type="number"
                  isRequired
                  suffix="%"
                />
              </div>

              {(session?.user?.permissions.includes("update:account-type") ||
                session?.user?.permissions.includes("update:account")) && (
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
              )}
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddTypeForm;
