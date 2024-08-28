import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { FieldArray, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import React from "react";
import { Button, Title } from "rizzui";
import { toast } from "sonner";
import { CategoriesArr } from "./ViewMember";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { useFetchData } from "@/react-query/useFetchData";
import { handleFetchState } from "@/utils/fetch-state-handler";
import {
  loanApplicationSchema,
  loanApplicationType,
} from "@/validations/transaction.schema";
import { periodOptions } from "@/utils/dummy";
import CustomSelect from "@/components/ui/form/select";
import AvaterPicker from "@/components/ui/form/avater-upload";

const LoanApplication = ({
  memberId,
  accountId,
  accountNumber,
  currentBalance,
  setCategoryLink,
}: {
  memberId: string;
  accountId: string;
  accountNumber: string;
  currentBalance: number;
  setCategoryLink: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data: session } = useSession();

  const headers = useGetHeaders({ type: "FormData" });

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const transactionStatusData = useFetchData(
    [queryKeys.getWithdrawelStatus, memberId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/status/${accountId}`,
    headers
  );

  const fetchStateHandler = handleFetchState(transactionStatusData);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const transactionStatus = transactionStatusData.data.data;

  const initialValues: loanApplicationType = {
    current_balance: currentBalance,
    account_id: accountNumber,
    amount: 0,
    duration: 0,
    grace_period: 0,
    purpose: "",
    max_loan: transactionStatus?.max_loan_amount,
    repayment_period_frequency: periodOptions[0].value,
    collaterals: [
      {
        name: "",
        attachment_photo: undefined,
      },
    ],
    guarantors: [
      {
        name: "",
        phone_number: "",
        occupation: "",
      },
      {
        name: "",
        phone_number: "",
        occupation: "",
      },
    ],
  };

  const handleLOanRequest = async (values: loanApplicationType) => {
    try {
      const newGuarantors: {
        name: string;
        phone_number: string;
        occupation: string;
        work_place: string;
      }[] = [];

      values.guarantors.forEach((guarantor) => {
        newGuarantors.push({
          ...guarantor,
          phone_number: "251" + guarantor.phone_number,
          work_place: guarantor.occupation,
        });
      });
      
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}loan-applications`,
        method: "POST",
        headers,
        body: {
          ...values,
          account_id: accountId,
          guarantors: newGuarantors,
          repayment_period_frequency:
            values.repayment_period_frequency.toLocaleLowerCase(),
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllTransactions + memberId],
          });

          toast.success("Withdraw made Successfully");

          setCategoryLink(CategoriesArr[1]);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      handleErrorWithToast(err, toast);

      console.log(err);
    }
  };

  return (
    <article className="poppins">
      <section className="flex justify-between items-center border border-primary rounded-xl p-4 mb-8">
        <div className="">
          <Title as="h4" className="font-medium text-xl text-primary">
            {"Loan Status"}
          </Title>
          {!transactionStatus?.able_to_loan && (
            <p className={`text-red-400 font-medium`}>
              You need to save for six concicative month!{" "}
            </p>
          )}
        </div>

        <Title
          as="h4"
          className={`pb-1 border px-5 py-2 rounded-lgtext-black  ${transactionStatus?.able_to_loan ? "bg-primary-light" : "bg-primary-lighter text-gray-400"} font-normal text-sm`}
        >
          {transactionStatus?.able_to_loan
            ? "Able to request"
            : "Not Available"}
        </Title>
      </section>

      <Formik
        initialValues={initialValues}
        validationSchema={loanApplicationSchema}
        onSubmit={(values: loanApplicationType) => handleLOanRequest(values)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form
              className={
                "[&_label.block>span]:font-medium grid grid-cols-2  gap-x-10 gap-y-6"
              }
            >
              <FormikInput
                name="account_id"
                label="Account Number"
                placeholder="Enter the term name"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                disabled
              />

              <FormikInput
                name="current_balance"
                label="Current Balance"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                disabled
              />

              <FormikInput
                name="max_loan"
                label="Maximum amount that can be granted (Based On Loan Teir)"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                disabled
                suffix="birr"
                type="number"
              />

              <FormikInput
                name="duration"
                label="Full Payment Duration"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                suffix="month"
                type="number"
                isRequired
              />

              <FormikInput
                name="grace_period"
                label="Grace Period After Loan"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                isRequired
                suffix="days"
                type="number"
              />

              <CustomSelect
                isSearchable
                name="repayment_period_frequency"
                label="Repayment Frequency Period"
                options={periodOptions}
                onChange={(selectedOption: { value: string }) => {
                  setFieldValue(
                    "repayment_period_frequency",
                    selectedOption.value
                  );
                }}
                placeholder="select period"
                getOptionValue={(saving_period: any) => saving_period?.id}
                getOptionLabel={(saving_period: any) => saving_period?.name}
                noOptionsMessage={() => "Fetching periods..."}
                isRequired
                className="col-span-2 md:col-span-1"
              />

              <FormikInput
                name="purpose"
                label="Purpose"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                isRequired
              />

              <FormikInput
                name="amount"
                label="Amount asked"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                type="number"
                suffix="birr"
                isRequired
              />

              <section className="mt-3 md:mt-6 py-5 col-span-2 grid grid-cols-2 gap-x-10 gap-y-6">
                <Title
                  as="h6"
                  className="md:text-lg font-medium border-b col-span-2 pb-1"
                >
                  At least one collateral or two guarantors are required.
                </Title>
                <FieldArray name="collaterals">
                  {(data: any) => (
                    <div className="col-span-2 mt-2">
                      <Title
                        as="h6"
                        className="text-base font-normal poppins mb-2"
                      >
                        Collaterals
                      </Title>

                      {values.collaterals?.map((_: any, index: number) => (
                        <div
                          key={index + "collaterals"}
                          className="grid grid-cols-2 gap-4 transition-opacity  duration-300 ease-in-out transform  mb-4 pb-6 border p-4 border-broken "
                        >
                          <FormikInput
                            name={`collaterals[${index}].name`}
                            label="Collateral Type / Name"
                            color="primary"
                            className="col-span-2 md:col-span-1"
                            isRequired
                          />
                          <AvaterPicker
                            name={`collaterals[${index}].attachment_photo`}
                            label="Collateral Images"
                            isMultiple
                            className="col-span-2"
                          />
                        </div>
                      ))}

                      <div className="flex justify-between mt-6">
                        <Button
                          onClick={() => {
                            data.push({
                              name: "",
                              attachment_photo: undefined,
                            });
                          }}
                          className="w-fit bg-primary text-white font-semibold"
                        >
                          Add Tier
                        </Button>
                        {values.collaterals.length > 0 && (
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

                <FieldArray name="guarantors">
                  {(data: any) => (
                    <div className="col-span-2 mt-6">
                      <Title
                        as="h6"
                        className="text-base font-normal poppins mb-2"
                      >
                        Guarantor
                      </Title>

                      {values.guarantors?.map((_: any, index: number) => (
                        <div
                          key={index + "guarantors"}
                          className="grid grid-cols-2 gap-4 transition-opacity  duration-300 ease-in-out transform  mb-4 pb-6 border p-4 border-broken "
                        >
                          <FormikInput
                            name={`guarantors[${index}].name`}
                            label="Guarantor Name"
                            placeholder="Full Name"
                            color="primary"
                            className="col-span-2"
                            isRequired
                          />
                          <FormikInput
                            name={`guarantors[${index}].phone_number`}
                            label="Phone Number"
                            placeholder="9**********"
                            prefix="+251"
                            color="primary"
                            type="number"
                            className="col-span-2 md:col-span-1"
                            isRequired
                          />
                          <FormikInput
                            name={`guarantors[${index}].occupation`}
                            placeholder=""
                            label="Guarantor Occupation / Job"
                            color="primary"
                            className="col-span-2 md:col-span-1"
                            isRequired
                          />
                        </div>
                      ))}

                      <div className="flex justify-between mt-6">
                        <Button
                          onClick={() => {
                            data.push({
                              name: "",
                              phone_number: "",
                              occupation: "",
                            });
                          }}
                          className="w-fit bg-primary text-white font-semibold"
                        >
                          Add Guarantor
                        </Button>
                        {values.guarantors.length > 0 && (
                          <Button
                            onClick={() => {
                              data.pop();
                            }}
                            className="w-fit bg-red-400 text-white font-semibold"
                          >
                            Remove Guarantor
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </FieldArray>
              </section>

              {!transactionStatus.able_to_withdraw && (
                <div className="my-5 text-red-500 col-span-2 text-center font-medium flex justify-center items-center">
                  <p className="border border-black rounded-lg px-4 py-2 w-fit">
                    User is not able to withdraw right now
                  </p>
                </div>
              )}

              {session?.user?.permissions.includes("update:account") &&
                transactionStatus.able_to_withdraw && (
                  <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                    <Button
                      color="primary"
                      className="px-10 text-white bg-primary-dark"
                      type="submit"
                      isLoading={postMutation.isPending}
                      disabled={
                        transactionStatus.able_to_withdraw ? false : true
                      }
                    >
                      Submit
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

export default LoanApplication;
