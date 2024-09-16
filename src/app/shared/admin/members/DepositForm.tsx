import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import useDynamicMutation from "@/react-query/usePostData";
import { DepositeSchema, DepositeType } from "@/validations/transaction.schema";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import React from "react";
import { Button, Title } from "rizzui";
import { toast } from "sonner";
import { CategoriesArr } from "./ViewMember";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { useFetchData } from "@/react-query/useFetchData";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { paymentChannels } from "@/utils/dummy";
import CustomSelect from "@/components/ui/form/select";

const paymentChannelsOptions = [
  {
    name: paymentChannels.bank,
    value: paymentChannels.bank,
  },
  {
    name: paymentChannels.cash,
    value: paymentChannels.cash,
  },
  {
    name: paymentChannels.cheque,
    value: paymentChannels.cheque,
  },
];

const paymentForOptions = [
  {
    name: "savings",
    value: "savings",
  },
  {
    name: "loan",
    value: "loan",
  },
];

const DepositForm = ({
  memberId,
  accountId,
  accountNumber,
  currentBalance,
  minimumThreshold,
  setCategoryLink,
  setRefetchAccount,
}: {
  memberId: string;
  accountId: string;
  accountNumber: string;
  currentBalance: number;
  minimumThreshold: number;
  setCategoryLink: React.Dispatch<React.SetStateAction<string>>;
  setRefetchAccount: React.Dispatch<React.SetStateAction<boolean>>;
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

  const initialValues: DepositeType = {
    account_id: accountNumber,
    amount: 0,
    current_balance: currentBalance,
    days_left: transactionStatus?.days_left,
    status_color: transactionStatus?.status_color,
    unpaid_penalties:
      transactionStatus?.unpaid_penalty_amounts +
      " * " +
      transactionStatus?.period,
    unpaid_penalty_amounts: transactionStatus?.unpaid_penalty_amounts,
    able_to_withdraw: transactionStatus?.able_to_withdraw,
    able_to_withdraw_amount: transactionStatus?.able_to_withdraw_amount,
    minimum_threshold: minimumThreshold,
    payment_channel: null,
    cheque_number: null,
    deposit_for: paymentForOptions[0].value,
  };

  const handleDeposit = async (values: DepositeType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/deposit/${accountId}`,
        method: "POST",
        headers,
        body: {
          amount: values.amount,
          deposit_for: values.deposit_for,
          payment_channel: values.payment_channel,
          cheque_number: values.cheque_number,
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllTransactions + memberId],
          });

          toast.success("Deposite made Successfully");

          setCategoryLink(CategoriesArr[1]);
          setRefetchAccount((prev) => !prev);
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
    <article>
      <Title as="h4" className="border-b mb-4 pb-1 font-medium text-xl">
        {"Deposit an amount"}
      </Title>
      <Formik
        initialValues={initialValues}
        validationSchema={DepositeSchema}
        onSubmit={(values: DepositeType) => handleDeposit(values)}
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
                suffix="birr"
              />
              <FormikInput
                name="days_left"
                label="Next Payment Day"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                disabled
                suffix="days"
              />

              <FormikInput
                name="unpaid_penalties"
                label="Unpaid Penality Periods"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                disabled
              />

              <FormikInput
                name="unpaid_penalty_amounts"
                label="Penality"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                disabled
                suffix="birr"
              />
              <FormikInput
                name="minimum_threshold"
                label="Minimum deposit threshold(on each payment)"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                disabled
                suffix="birr"
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

              {(transactionStatus?.days_left <= 0 ||
                transactionStatus?.unpaid_penalty_amounts > 0) && (
                <>
                  <div className="mt-4 w-full flex flex-col gap-6 ">
                    <CustomSelect
                      name="deposit_for"
                      label="Payment For"
                      options={paymentForOptions}
                      onChange={(selectedOption: { value: string }) => {
                        setFieldValue("deposit_for", selectedOption.value);
                      }}
                      placeholder="select payment for type"
                      getOptionValue={(period: { value: string }) =>
                        period.value
                      }
                      getOptionLabel={(period: { value: string }) =>
                        period.value.toUpperCase()
                      }
                      noOptionsMessage={() => "Fetching..."}
                      isRequired
                    />
                  </div>
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
                      getOptionValue={(period: { value: string }) =>
                        period.value
                      }
                      getOptionLabel={(period: { value: string }) =>
                        period.value
                      }
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
                </>
              )}

              <FormikInput
                name="amount"
                label="Amount to deposit(Must be greater or equal to minimum deposit threshold plus penality"
                color="primary"
                className="col-span-2 md:col-span-1 w-full mt-2"
                labelClassName="pb-2"
                type="number"
                suffix="birr"
                isRequired
              />

              {session?.user?.permissions.includes("update:account") && (
                <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                  <Button
                    color="primary"
                    className="px-10 text-white bg-primary-dark"
                    type="submit"
                    isLoading={postMutation.isPending}
                  >
                    Deposit
                  </Button>
                </div>
              )}

              {/* {transactionStatus?.days_left <= 0 ||
                (transactionStatus?.unpaid_penalty_amounts > 0 && (
                  <FormikInput
                    name="amount"
                    label="Amount to deposit(Must be greater or equal to minimum deposit threshold plus penality"
                    color="primary"
                    className="col-span-2 md:col-span-1 w-full"
                    type="number"
                    suffix="birr"
                    isRequired
                  />
                ))}
              {session?.user?.permissions.includes("update:account") &&
                (transactionStatus?.days_left <= 0 ||
                  transactionStatus?.unpaid_penalty_amounts > 0) && (
                  <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                    <Button
                      color="primary"
                      className="px-10 text-white bg-primary-dark"
                      type="submit"
                      isLoading={postMutation.isPending}
                    >
                      Deposit
                    </Button>
                  </div>
                )} */}
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default DepositForm;
