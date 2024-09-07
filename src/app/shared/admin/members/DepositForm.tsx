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
  };

  const handleDeposit = async (values: DepositeType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/deposit/${accountId}`,
        method: "POST",
        headers,
        body: {
          amount: values.amount,
          deposit_for: "savings",
          payment_channel: paymentChannels.bank,
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
        {({}) => {
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

              <FormikInput
                name="amount"
                label="Amount to deposit(Must be greater or equal to minimum deposit threshold plus penality"
                color="primary"
                className="col-span-2 md:col-span-1 w-full"
                type="number"
                suffix="birr"
                isRequired
              />

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
