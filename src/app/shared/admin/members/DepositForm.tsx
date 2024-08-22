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

const DepositForm = ({
  memberId,
  accountId,
  accountNumber,
  currentBalance,
  minimumThreshold,
  setCategoryLink,
}: {
  memberId: string;
  accountId: string;
  accountNumber: string;
  currentBalance: number;
  minimumThreshold: number;
  setCategoryLink: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data: session } = useSession();

  const headers = useGetHeaders({ type: "Json" });

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const withdrawelStatusData = useFetchData(
    [queryKeys.getWithdrawelStatus, memberId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/status/${accountId}`,
    headers
  );

  const fetchStateHandler = handleFetchState(withdrawelStatusData);

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  const withdrawStatus = withdrawelStatusData.data.data;

  const initialValues: DepositeType = {
    account_id: accountNumber,
    amount: 0,
    current_balance: currentBalance,
    days_left: withdrawStatus?.days_left,
    status_color: withdrawStatus?.status_color,
    unpaid_penalties: withdrawStatus?.unpaid_penalties,
    unpaid_penalty_amounts: withdrawStatus?.unpaid_penalty_amounts,
    able_to_withdraw: withdrawStatus?.able_to_withdraw,
    able_to_withdraw_amount: withdrawStatus?.able_to_withdraw_amount,
    minimum_threshold: minimumThreshold
  };

  const handleDeposit = async (values: DepositeType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/deposit/${accountId}`,
        method: "POST",
        headers,
        body: {
          amount: values.amount,
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllTransactions + memberId],
          });

          toast.success("Deposite made Successfully");

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
                className="col-span-1 w-full"
                disabled
              />
              <FormikInput
                name="current_balance"
                label="Current Balance"
                color="primary"
                className="col-span-1 w-full"
                disabled
                suffix="birr"
              />
              <FormikInput
                name="days_left"
                label="Available Payment Days Left"
                color="primary"
                className="col-span-1 w-full"
                disabled
                suffix="days"
              />
              <FormikInput
                name="unpaid_penalty_amounts"
                label="Penality"
                color="primary"
                className="col-span-1 w-full"
                disabled
                suffix="birr"
              />
              <FormikInput
                name="minimum_threshold"
                label="Minimum deposit threshold(on each payment)"
                color="primary"
                className="col-span-1 w-full"
                disabled
                suffix="birr"
              />
              <FormikInput
                name="amount"
                label="Amount to deposit(Must be greater or equal to minimum deposit threshold plus penality"
                color="primary"
                className="col-span-1 w-full"
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
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default DepositForm;