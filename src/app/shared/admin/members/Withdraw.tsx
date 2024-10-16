import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import useDynamicMutation from "@/react-query/usePostData";
import { WithdrawSchema, WithdrawType } from "@/validations/transaction.schema";
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
import CustomSelect from "@/components/ui/form/select";
import { paymentChannels, paymentChannelsOptions } from "@/utils/dummy";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import TransactionsHistory from "./Transactions";
import { transactionStatusType } from "types/common_types";

const WithdrawalForm = ({
  memberId,
  accountId,
  accountNumber,
  currentBalance,
  setCategoryLink,
  setRefetchAccount,
}: {
  memberId: string;
  accountId: string;
  accountNumber: string;
  currentBalance: number;
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
  const transactionStatus:transactionStatusType = transactionStatusData.data.data;

  const initialValues: WithdrawType = {
    account_id: accountNumber,
    amount: 0,
    current_balance: currentBalance,
    days_left: transactionStatus?.days_left,
    status_color: transactionStatus?.status_color,
    unpaid_penalties: transactionStatus?.unpaid_penalties,
    unpaid_penalty_amounts: transactionStatus?.unpaid_penalty_amounts,
    able_to_withdraw: transactionStatus?.able_to_withdraw,
    able_to_withdraw_amount: transactionStatus?.able_to_withdraw_amount,
    payment_channel: null,
    cheque_number: null,
    purpose: "",
  };

  const handleWithdraw = async (values: WithdrawType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/withdraw/${accountId}`,
        method: "POST",
        headers,
        body: {
          amount: values.amount,
          payment_channel: values.payment_channel,
          cheque_number: values.cheque_number,
          purpose: values.purpose,
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllTransactions + memberId],
          });

          toast.success("Withdraw made Successfully");

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
        {"Withdraw an amount"}
      </Title>
      <Formik
        initialValues={initialValues}
        validationSchema={WithdrawSchema}
        onSubmit={(values: WithdrawType) => handleWithdraw(values)}
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
                name="able_to_withdraw_amount"
                label="Maxiumum amount that can be withdrawn from the account"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                disabled
                suffix="birr"
              />

              <FormikTextArea
                name="purpose"
                label="Purpose of withdraw"
                color="primary"
                className="col-span-2  w-full"
                isRequired
              />

              

              <div className="mt-4 w-full flex flex-col gap-6 col-span-2 md:col-span-2">
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
                  disabled={transactionStatus.able_to_withdraw ? false : true}
                  labelClassName="mb-0 py-0"
                />
              </div>

              {values.payment_channel === paymentChannels.cheque && (
                <FormikInput
                  name="cheque_number"
                  label="Cheque Number"
                  color="primary"
                  className="col-span-2 md:col-span-1 w-full mt-2"
                  labelClassName=""
                  isRequired
                />
              )}

              <FormikInput
                name="amount"
                label="Amount to withdraw(must be less than or equal to able to withdraw amount)"
                color="primary"
                className="col-span-2 w-full"
                type="number"
                disabled={transactionStatus.able_to_withdraw ? false : true}
                suffix="birr"
                isRequired
              />

              {!transactionStatus.able_to_withdraw && (
                <div className="my-5 text-red-500 col-span-2 text-center font-medium flex justify-center items-center">
                  <p className="border border-black rounded-lg px-4 py-2 w-fit">
                    User is not able to withdraw right now
                  </p>
                </div>
              )}

              {session?.user?.permissions.includes("update:account") &&
                transactionStatus.able_to_withdraw && (
                  <div className="col-span-2 flex items-end justify-end gap-4 mt-4">
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

      <TransactionsHistory
        title="Withdrawal History"
        type="withdraw"
        accountNumber={accountNumber}
        memberId={memberId}
        accountId={accountId}
      />

    </article>
  );
};

export default WithdrawalForm;
