"use client";
import React from "react";
import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";

import { Formik, Form, FieldArray } from "formik";

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

const AddTypeForm = ({ id }: { id?: string }) => {
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

  const AccountTYpe: InterstTypeType = typesData?.data?.data;

  const initialValues: InterstTypeType = {
    name: id ? AccountTYpe.name : "",
    minimum_threshold: id ? AccountTYpe.minimum_threshold : 0,
    interest_period: id ? AccountTYpe.interest_period : "",
    interest_rate: id ? AccountTYpe.interest_rate : 0,

    saving_period: id ? AccountTYpe.saving_period : "",
    penalty_rate: id ? AccountTYpe.penalty_rate : 0,
    interest_tiers:
      id && AccountTYpe.interest_tiers
        ? AccountTYpe.interest_tiers.flatMap((trier) => {
            return {
              interest_rate: trier.interest_rate,
              threshold: trier.threshold,
            };
          })
        : [
            {
              interest_rate: 0,
              threshold: 0,
            },
          ],
    loan_tiers:
      id && AccountTYpe.loan_tiers
        ? AccountTYpe.loan_tiers.flatMap((trier) => {
            return {
              max_loan_amount: trier.max_loan_amount,
              threshold: trier.threshold,
              max_loan_multiplier: trier.max_loan_multiplier,
              penalty_rate: trier.penalty_rate,
              required_months: trier.required_months,
              interest_rate: trier.interest_rate,
            };
          })
        : [
            {
              max_loan_amount: 0,
              threshold: 0,
              max_loan_multiplier: 0,
              penalty_rate: 0,
              required_months: 0,
              interest_rate: 0,
            },
          ],
  };

  const createTermSubmitHandler = async (values: InterstTypeType) => {
    try {
      console.log(values);
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types/${id}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types`,
        method: id ? "PUT" : "POST",
        headers,
        body: {
          ...values,
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
        {({ values, setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {id ? "Edit Account Type" : "Add Account Type"}
              </Title>

              <section className="grid grid-cols-2 gap-5">
                <FormikInput
                  name="name"
                  label="Account type"
                  placeholder="Enter the type name"
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

                <CustomSelect
                  isSearchable
                  name="saving_period"
                  label="Saving Period"
                  options={periodOptions}
                  onChange={(selectedOption: { value: string }) => {
                    setFieldValue("saving_period", selectedOption.value);
                  }}
                  placeholder="select saving period"
                  getOptionValue={(saving_period: any) => saving_period?.id}
                  getOptionLabel={(saving_period: any) => saving_period?.name}
                  noOptionsMessage={() => "Fetching periods..."}
                  defaultValue={
                    id &&
                    periodOptions.find(
                      (p) => p.name === AccountTYpe.saving_period
                    )
                  }
                  isRequired
                />

                <FormikInput
                  name="penalty_rate"
                  label="Penality Rate"
                  placeholder="Enter the penality rate"
                  color="primary"
                  className="col-span-1"
                  type="number"
                  isRequired
                  suffix="%"
                />

                <CustomSelect
                  isSearchable
                  name="interest_period"
                  label="Default Interest Period (will be used if tier is not defined)"
                  options={periodOptions}
                  onChange={(selectedOption: { value: string }) => {
                    setFieldValue("interest_period", selectedOption.value);
                  }}
                  placeholder="select interest period"
                  getOptionValue={(interest_period: any) => interest_period?.id}
                  getOptionLabel={(interest_period: any) =>
                    interest_period?.name
                  }
                  noOptionsMessage={() => "Fetching periods..."}
                  defaultValue={
                    id &&
                    periodOptions.find(
                      (p) => p.name === AccountTYpe.interest_period
                    )
                  }
                />

                <FormikInput
                  name={`interest_rate`}
                  label="Default Interest Rate (will be used if tier is not defined)"
                  placeholder="Enter the rate"
                  suffix="%"
                  color="primary"
                  className="col-span-1"
                  type="number"
                />

                <FieldArray name="interest_tiers">
                  {(data: any) => (
                    <div className="col-span-1 mt-6">
                      <Title
                        as="h6"
                        className="text-base font-normal poppins mb-2"
                      >
                        Interest Tiers
                      </Title>

                      {values.interest_tiers?.map((_: any, index: number) => (
                        <div
                          key={index + "interest_tiers"}
                          className="grid grid-cols-2 gap-4 transition-opacity  duration-300 ease-in-out transform  mb-4 pb-6 border p-4 border-broken "
                        >
                          <FormikInput
                            name={`interest_tiers[${index}].interest_rate`}
                            label="Interest Rate"
                            placeholder="Enter the rate"
                            suffix="%"
                            color="primary"
                            className="col-span-2"
                            type="number"
                            isRequired
                          />
                          <FormikInput
                            name={`interest_tiers[${index}].threshold`}
                            label="Threshold"
                            placeholder="Enter the threshold"
                            suffix="birr"
                            color="primary"
                            className="col-span-2"
                            type="number"
                            isRequired
                          />
                        </div>
                      ))}

                      <div className="flex justify-between mt-6">
                        <Button
                          onClick={() => {
                            data.push({
                              interest_rate: 0,
                              threshold: 0,
                            });
                          }}
                          className="w-fit bg-primary text-white font-semibold"
                        >
                          Add Tier
                        </Button>
                        {values.interest_tiers.length > 1 && (
                          <Button
                            onClick={() => {
                              data.pop();
                            }}
                            className="w-fit bg-red-400 text-white font-semibold"
                          >
                            Remove Tier
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </FieldArray>

                <FieldArray name="loan_tiers">
                  {(data: any) => (
                    <div className="col-span-1 mt-6">
                      <Title
                        as="h6"
                        className="text-base font-normal poppins mb-2"
                      >
                        Loan Tiers
                      </Title>

                      {values.loan_tiers?.map((_: any, index: number) => (
                        <div
                          key={index + "loan_tiers max_loan_amount"}
                          className="grid grid-cols-2 gap-4 transition-opacity  duration-300 ease-in-out transform  mb-4 pb-6 border p-4 border-broken "
                        >
                          <FormikInput
                            name={`loan_tiers[${index}].max_loan_amount`}
                            label="Max loan amount"
                            placeholder="Enter the max loan amount"
                            color="primary"
                            suffix="birr"
                            className="col-span-2"
                            type="number"
                            isRequired
                          />
                          <FormikInput
                            name={`loan_tiers[${index}].threshold`}
                            label="Threshold"
                            placeholder="Enter the threshold"
                            color="primary"
                            suffix="birr"
                            className="col-span-2"
                            type="number"
                            isRequired
                          />

                          <FormikInput
                            name={`loan_tiers[${index}].max_loan_multiplier`}
                            label="Loan Multiplier"
                            placeholder="Enter the maximum loan multiplier"
                            color="primary"
                            className="col-span-2"
                            type="number"
                            isRequired
                          />

                          <FormikInput
                            name={`loan_tiers[${index}].penalty_rate`}
                            label="Penality Rate"
                            placeholder="Enter the penalty rate"
                            suffix="%"
                            color="primary"
                            className="col-span-2"
                            type="number"
                            isRequired
                          />

                          <FormikInput
                            name={`loan_tiers[${index}].required_months`}
                            label="Required Months"
                            placeholder="Enter the required month before loan eligiblity"
                            suffix="months"
                            color="primary"
                            className="col-span-2"
                            type="number"
                            isRequired
                          />

                          <FormikInput
                            name={`loan_tiers[${index}].interest_rate`}
                            label="Interest Rate"
                            placeholder="Enter the interest_rate"
                            suffix="%"
                            color="primary"
                            className="col-span-2"
                            type="number"
                            isRequired
                          />
                        </div>
                      ))}

                      <div className="flex justify-between mt-6">
                        <Button
                          onClick={() => {
                            data.push({
                              max_loan_amount: 0,
                              threshold: 0,
                            });
                          }}
                          className="w-fit bg-primary text-white font-semibold"
                        >
                          Add Tier
                        </Button>
                        {values.loan_tiers.length > 1 && (
                          <Button
                            onClick={() => {
                              data.pop();
                            }}
                            className="w-fit bg-red-400 text-white font-semibold"
                          >
                            Remove Tier
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </FieldArray>
              </section>

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
