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
import Loading from "@/components/ui/Loading";

const WithdrawalForm = ({
  memberId,
  accountId,
  accountNumber,
  currentBalance,
  setCategoryLink,
}: {
  memberId: string;
  accountId: string;
  accountNumber: string;
  currentBalance: string;
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

  const fetchStateHandler = handleFetchState(
    withdrawelStatusData,
    <div className="flex justify-center items-center">
      <Loading />
    </div>
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }

  console.log(withdrawelStatusData.data);
  const withdrawStatus = withdrawelStatusData.data.data;

  const initialValues: DepositeType = {
    account_id: accountNumber,
    amount: 0,
  };

  const handleDeposite = async (values: DepositeType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions/deposit/${accountId}`,
        method: "POST",
        headers,
        body: {
          ...values,
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllTransactions + memberId],
          });

          toast.success("Deposite masde Successfully");

          setCategoryLink(CategoriesArr[2]);
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
      <Formik
        initialValues={initialValues}
        validationSchema={DepositeSchema}
        onSubmit={(values: DepositeType) => handleDeposite(values)}
      >
        {({}) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {"Deposit an amount"}
              </Title>

              <FormikInput
                name="account_id"
                label="Account Number"
                placeholder="Enter the term name"
                color="primary"
                className="mb-6 w-3/5"
                disabled
              />

              <FormikInput
                name="current_balance"
                label="Current Balance"
                color="primary"
                className="mb-6 w-3/5"
                placeholder={currentBalance}
                disabled
                suffix="birr"
              />

              <FormikInput
                name="able_to_withdraw"
                label="Amount that can be withdrawn from the account"
                placeholder="5"
                color="primary"
                className="mb-6 w-3/5"
                disabled
                suffix="birr"
              />

              <FormikInput
                name="amount"
                label="Amount to withdraw"
                placeholder="Enter the amount in birr"
                color="primary"
                className="w-3/5"
                type="number"
                suffix="birr"
                isRequired
              />

              {session?.user?.permissions.includes("update:account") &&
               (
                <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                  <Button
                    color="primary"
                    className="px-10 text-white bg-primary-dark"
                    type="submit"
                    isLoading={postMutation.isPending}
                    disabled={withdrawStatus.able_to_withdraw ? false : true}
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

export default WithdrawalForm;
