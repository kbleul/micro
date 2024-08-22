import * as Yup from "yup";
export const DepositeSchema = Yup.object().shape({
  account_id: Yup.string().required("Name is required"),
  amount: Yup.number()
    .min(0, "Amount is too small")
    .test(
      'amount-greater-than-unpaid-penalty-and-minimum',
      'Amount must be greater than or equal to the sum of unpaid penalty and minimum threshold',
      (amount, context) => {
        const { unpaid_penalty_amounts, minimum_threshold } = context.parent;
        return amount ? amount >= (unpaid_penalty_amounts + minimum_threshold) : false;
      }
    )
    .required("Amount is required"),
  unpaid_penalty_amounts: Yup.number().min(0, "Amount is too small"),
  minimum_threshold: Yup.number().min(0, "Amount is too small"),
});

type DepositeType = {
  account_id: string;
  amount: number;
  current_balance: number;
  days_left: number;
  status_color: string;
  unpaid_penalties: number;
  unpaid_penalty_amounts: number;
  able_to_withdraw: boolean;
  able_to_withdraw_amount: string;
  minimum_threshold: number;
};

export const WithdrawSchema = Yup.object().shape({
  account_id: Yup.string().required("Name is required"),
  able_to_withdraw_amount: Yup.number().required(
    "Abble to withdraw is required"
  ),
  amount: Yup.number()
    .min(0, "Amount is too small")
    .max(
      Yup.ref("able_to_withdraw_amount"),
      "Amount cannot exceed the available withdrawal amount"
    )
    .required("Amount is required"),
  current_balance: Yup.number(),
});

type WithdrawType = {
  account_id: string;
  amount: number;
  current_balance: number;
  days_left: number;
  status_color: string;
  unpaid_penalties: number;
  unpaid_penalty_amounts: number;
  able_to_withdraw: boolean;
  able_to_withdraw_amount: string;
};

export type { DepositeType, WithdrawType };
