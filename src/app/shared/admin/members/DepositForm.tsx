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

const DepositForm = ({
  memberId,
  accountId,
  accountNumber,
  setCategoryLink,
}: {
  memberId: string;
  accountId: string;
  accountNumber: string;
  setCategoryLink: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data: session } = useSession();

  const headers = useGetHeaders({ type: "Json" });

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

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
      <Formik
        initialValues={initialValues}
        validationSchema={DepositeSchema}
        onSubmit={(values: DepositeType) => handleDeposite(values)}
      >
        {({}) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {"Deposite an amount"}
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
                name="amount"
                label="Amount to deposit"
                placeholder="Enter the amount in birr"
                color="primary"
                className="w-3/5"
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
