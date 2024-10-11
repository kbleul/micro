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
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { useFetchData } from "@/react-query/useFetchData";
import { handleFetchState } from "@/utils/fetch-state-handler";
import {
  loanApplicationSchema,
  loanApplicationType,
} from "@/validations/transaction.schema";
import { loanStatusCategorized, periodOptions } from "@/utils/dummy";
import CustomSelect from "@/components/ui/form/select";
import AvaterPicker from "@/components/ui/form/avater-upload";
import StatusViewer from "./StatusViewer";
import { transactionStatusType } from "types/common_types";

const parsePeriod = (period: string) => {
  const firstletter = period[0].toUpperCase();
 
  return firstletter + period.slice(1, period.length);
};

const LoanApplication = ({
  memberId,
  accountId,
  accountNumber,
  currentBalance,
}: {
  memberId: string;
  accountId: string;
  accountNumber: string;
  currentBalance: number;
}) => {
  const { data: session } = useSession();

  const headers = useGetHeaders({ type: "Json" });

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const transactionStatusData = useFetchData(
    [queryKeys.getWithdrawelStatus, memberId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/status/${accountId}`,
    headers
  );

  const loanData = useFetchData(
    [queryKeys.getLoan, memberId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}loan-applications/loans?account_id=${accountId}`,
    headers,
    transactionStatusData.isFetching
      ? false
      : transactionStatusData?.data?.data?.has_active_loan
        ? true
        : false
  );
  //loanStatusCategorized.viewForm.includes(loanStatus))
  const fetchStateHandler = handleFetchState(transactionStatusData);
  const fetchStateHandlerLoan = handleFetchState(loanData);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  if (
    transactionStatusData?.data?.data?.has_active_loan &&
    fetchStateHandlerLoan
  ) {
    return fetchStateHandlerLoan;
  }

  const transactionStatus: transactionStatusType =
    transactionStatusData?.data?.data;

  const activeLoanData =
    loanData?.data?.data?.loan_applications &&
    loanData?.data?.data?.loan_applications.length > 0
      ? loanData?.data?.data?.loan_applications[0]
      : null;

  const initialValues: loanApplicationType = {
    current_balance: currentBalance,
    account_id: accountNumber,
    amount: activeLoanData ? activeLoanData?.amount : 0,
    duration: activeLoanData ? activeLoanData?.duration : 0,
    grace_period: activeLoanData ? activeLoanData?.grace_period : 0,
    purpose: activeLoanData ? activeLoanData?.purpose : "",
    max_loan: transactionStatus?.max_loan_amount,
    repayment_period_frequency: activeLoanData
      ? parsePeriod(activeLoanData?.repayment_period_frequency)
      : periodOptions[0].value,
    collaterals: activeLoanData
      ? activeLoanData?.collaterals?.flatMap((coll: any) => {
          return {
            name: coll.name,
            attachment_photo: undefined,
          };
        })
      : [
          {
            name: "",
            attachment_photo: undefined,
          },
        ],
    guarantors: activeLoanData
      ? activeLoanData?.guarantors?.flatMap((gua: any) => {
          return {
            name: gua.name,
            phone_number: gua.phone_number,
            occupation: gua.workplace,
          };
        })
      : [],
  };

  const handleLoanRequest = async (values: loanApplicationType) => {
    try {
      const newGuarantors: {
        name: string;
        phone_number: string;
        occupation: string;
        workplace: string;
      }[] = [];

      values.guarantors.forEach((guarantor) => {
        newGuarantors.push({
          ...guarantor,
          phone_number: "251" + guarantor.phone_number,
          workplace: guarantor.occupation,
        });
      });

      const newCollateral: {
        name: string;
        attachment_photo: string;
      }[] = [];

      values.collaterals.forEach((collateral) => {
        newCollateral.push({
          ...collateral,
          attachment_photo: "asdsadsa",
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
          collaterals: newCollateral,
          repayment_period_frequency:
            values.repayment_period_frequency.toLocaleLowerCase(),
          status: true,
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getWithdrawelStatus],
          });

          toast.success("Loan application successfull");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      handleErrorWithToast(err, toast);
    }
  };
  return (
    <article className="poppins">
      <StatusViewer
        ableToLoan={transactionStatus?.able_to_loan}
        loanStatus={transactionStatus?.active_loan_status}
      />

      {!transactionStatus?.able_to_loan &&
      transactionStatus?.active_loan_status === "" ? (
        <></>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={loanApplicationSchema}
          onSubmit={(values: loanApplicationType) => handleLoanRequest(values)}
        >
          {({ errors, values, setFieldValue }) => {
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
                  label="Maximum amount that can be granted (Based On Loan Tier)"
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
                  disabled={activeLoanData ? true : false}
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
                  defaultValue={
                    activeLoanData &&
                    periodOptions.find(
                      (x) =>
                        x.name ===
                        parsePeriod(activeLoanData?.repayment_period_frequency)
                    )
                  }
                  getOptionValue={(saving_period: any) => saving_period?.id}
                  getOptionLabel={(saving_period: any) => saving_period?.name}
                  noOptionsMessage={() => "Fetching periods..."}
                  isRequired
                  className="col-span-2 md:col-span-1"
                  labelClassName="mb-0 py-0"
                  disabled={activeLoanData ? true : false}
                />

                <FormikInput
                  name="purpose"
                  label="Purpose"
                  color="primary"
                  className="col-span-2 md:col-span-1 w-full"
                  isRequired
                  disabled={activeLoanData ? true : false}
                />

                <FormikInput
                  name="amount"
                  label="Amount asked"
                  color="primary"
                  className="col-span-2 md:col-span-1 w-full"
                  type="number"
                  suffix="birr"
                  isRequired
                  disabled={activeLoanData ? true : false}
                />

                <section className="mt-3 md:mt-6 py-5 col-span-2 grid grid-cols-2 gap-x-10 gap-y-6">
                  <Title
                    as="h6"
                    className={`md:text-lg font-medium border-b col-span-2 pb-1 ${(errors.collaterals || errors.guarantors) && "text-red-400"}`}
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
                              className="col-span-2 "
                              isRequired
                              disabled={activeLoanData ? true : false}
                            />
                            <AvaterPicker
                              name={`collaterals[${index}].attachment_photo`}
                              label="Collateral Images"
                              isMultiple
                              className="col-span-2"
                            />
                          </div>
                        ))}

                       {!activeLoanData && <div className="flex justify-between mt-6">
                          <Button
                            onClick={() => {
                              data.push({
                                name: "",
                                attachment_photo: undefined,
                              });
                            }}
                            className="w-fit bg-primary text-white font-semibold"
                          >
                            Add Collateral
                          </Button>
                          {values.collaterals.length > 0 && (
                            <Button
                              onClick={() => {
                                data.pop();
                              }}
                              className="w-fit bg-red-400 text-white font-semibold"
                            >
                              Remove Collateral
                            </Button>
                          )}
                        </div>}
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
                              disabled={activeLoanData ? true : false}
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
                              disabled={activeLoanData ? true : false}
                            />
                            <FormikInput
                              name={`guarantors[${index}].occupation`}
                              placeholder=""
                              label="Guarantor Occupation / Job"
                              color="primary"
                              className="col-span-2 md:col-span-1"
                              isRequired
                              disabled={activeLoanData ? true : false}
                            />
                          </div>
                        ))}

                      {!activeLoanData &&  <div className="flex justify-between mt-6">
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
                        </div>}
                      </div>
                    )}
                  </FieldArray>
                </section>

                {session?.user?.permissions.includes("update:account") &&
                loanStatusCategorized.viewForm.includes(transactionStatus?.active_loan_status) && (
                  <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                    <Button
                      color="primary"
                      className="px-10 text-white bg-primary-dark"
                      type="submit"
                      isLoading={postMutation.isPending}
                      disabled={transactionStatus.able_to_loan ? false : true}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      )}
    </article>
  );
};

export default LoanApplication;
