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

  const headers = useGetHeaders({ type: "Json" });

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
    account_id: accountNumber,
    amount: 0,
    duration: 0,
    grace_period: 0,
    purpose: "",
    max_loan: transactionStatus?.unpaid_penalty_amounts,
    repayment_period_frequency: periodOptions[0].value,
    collaterals: [],
    guarantor: [],
  };

  const handleWithdraw = async (values: loanApplicationType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/withdraw/${accountId}`,
        method: "POST",
        headers,
        body: {
          amount: values.amount,
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
      <div className="flex justify-between items-center border border-primary rounded-xl p-4 mb-8">
        <Title as="h4" className="font-medium text-xl text-primary">
          {"Loan Status"}
        </Title>

        <Title
          as="h4"
          className="pb-1 border px-5 py-2 rounded-lg bg-primary-light text-black font-normal text-sm"
        >
          {"Able to request"}
        </Title>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loanApplicationSchema}
        onSubmit={(values: loanApplicationType) => handleWithdraw(values)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form
              className={
                "[&_label.block>span]:font-medium grid grid-cols-2 gap-x-10 gap-y-6"
              }
            >
              <FormikInput
                name="account_id"
                label="Account Number"
                placeholder="Enter the term name"
                color="primary"
                className="col-span-1 w-full"
                disabled
              />

              <FormikInput
                name="duration"
                label="Full Payment Duration"
                color="primary"
                className="col-span-1 w-full"
                disabled
                suffix="days"
                type="number"
              />

              <FormikInput
                name="grace_period"
                label="Grace Period After Loan"
                color="primary"
                className="col-span-1 w-full"
                disabled
                suffix="days"
                type="number"
              />

              <FormikInput
                name="purpose"
                label="Purpose"
                color="primary"
                className="col-span-1 w-full"
                disabled
              />

              <FormikInput
                name="max_loan"
                label="Maximum amount that can be granted"
                color="primary"
                className="col-span-1 w-full"
                disabled
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
              />

              <FormikInput
                name="amount"
                label="Amount to withdraw(must be less than zero able to withdraw amount"
                color="primary"
                className="col-span-1 w-full"
                type="number"
                suffix="birr"
                isRequired
              />

              <FieldArray name="collaterals">
                {(data: any) => (
                  <div className="col-span-2 mt-6">
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
                          className="col-span-2"
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
                      {values.collaterals.length > 1 && (
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
                      Withdraw
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
