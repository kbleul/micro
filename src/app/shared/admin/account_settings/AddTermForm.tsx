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
import {
  InterstTermsSchema,
  InterstTermType,
} from "@/validations/interest_term.schema";
import { periodOptions } from "@/utils/dummy";
import CustomSelect from "@/components/ui/form/select";
import { useSession } from "next-auth/react";

const AddTermForm = ({
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

  const termsData = useFetchData(
    [queryKeys.getInterstTerms + id, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}interest-terms/${id}`,
    headers,
    !!id
  );

  if (termsData.isFetching) {
    return <Loading />;
  }

  const initialValues: InterstTermType = {
    name: id ? termsData?.data?.data?.name : "",
    grace_period: id ? termsData?.data?.data?.grace_period : 0,
    interest_rate: id ? termsData?.data?.data?.interest_rate : 0,
    period: id ? termsData?.data?.data?.period : periodOptions[0].value,
  };

  const createTermSubmitHandler = async (values: InterstTermType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}interest-terms/${id}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}interest-terms`,
        method: "POST",
        headers,
        body: {
          ...values,
          _method: id ? "PATCH" : "POST",
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getInterstTerms],
          });

          toast.success(
            id ? "Term updated Successfully" : "Term created Successfully"
          );
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

  console.log(
    "//////////////////////",
    session?.user?.permissions.includes("update:account-type")
  );

  return (
    <article className="p-8 pb-28">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={InterstTermsSchema}
        onSubmit={(values: InterstTermType) => createTermSubmitHandler(values)}
      >
        {({ setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {id ? "Edit Interst Term" : "Add Interst Term"}
              </Title>

              <FormikInput
                name="name"
                label="Interst Term"
                placeholder="Enter the term name"
                color="primary"
                className="mb-6"
              />
              <FormikInput
                name="grace_period"
                label="Grace Period"
                placeholder="Enter the term name"
                color="primary"
                className="mb-6"
                type="number"
                suffix="days"
              />
              <FormikInput
                name="interest_rate"
                label="Interest Rate"
                placeholder="Enter the interest rate(0 - 100%)"
                color="primary"
                className="mb-6"
                type="number"
                suffix="%"
              />

              <div className="mt-4 w-full flex flex-col gap-6 ">
                <CustomSelect
                  isSearchable
                  name="period"
                  label="Period"
                  options={periodOptions}
                  onChange={(selectedOption: any) => {
                    setFieldValue("period", selectedOption.name);
                  }}
                  placeholder="select period"
                  getOptionValue={(period: any) => period?.name}
                  getOptionLabel={(period: any) => period?.name}
                  noOptionsMessage={() => "Fetching periods..."}
                  defaultValue={periodOptions.filter(
                    (p) => p.value === termsData?.data?.data?.period
                  )}
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

export default AddTermForm;
