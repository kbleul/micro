import * as Yup from "yup";
export const DepositeSchema = Yup.object().shape({
  account_id: Yup.string().required("Name is required"),
  amount: Yup.number()
    .min(0, "Amount is too small")
    .test(
      "amount-greater-than-unpaid-penalty-and-minimum",
      "Amount must be greater than or equal to the sum of unpaid penalty and minimum threshold",
      (amount, context) => {
        const { unpaid_penalty_amounts, minimum_threshold } = context.parent;
        return amount
          ? amount >= unpaid_penalty_amounts + minimum_threshold
          : false;
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
  unpaid_penalties: string;
  unpaid_penalty_amounts: number;
  able_to_withdraw: boolean;
  able_to_withdraw_amount: string;
  minimum_threshold: number;
};

export const WithdrawSchema = Yup.object().shape({
  account_id: Yup.string().required("Name is required"),
  able_to_withdraw_amount: Yup.number().required(
    "Able to withdraw is required"
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

export const loanApplicationSchema = Yup.object()
  .shape({
    account_id: Yup.string().required("Account id is required"),
    max_loan: Yup.number().required(
      "Maximum amount able to get loan is required"
    ),
    amount: Yup.number()
      .min(0, "Amount is too small")
      .max(
        Yup.ref("max_loan"),
        "Amount cannot exceed the available max loan amount"
      )
      .required("Amount is required"),
    duration: Yup.number()
      .min(1, "Duration should be in valid month")
      .required("Payment duration is required"),
    grace_period: Yup.number().required("Grace period is required"),
    purpose: Yup.string(),
    repayment_period_frequency: Yup.string().required(
      "Repayment_period_frequency is required"
    ),
    collaterals: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        attachment_photo: Yup.mixed(),
      })
    ),
    guarantors: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        phone_number: Yup.string()
          .min(1)
          .required("Phone number is required")
          .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
        occupation: Yup.string().required("Occupation is required"),
      })
    ),
  })
  .test(
    "collaterals-or-guarantors",
    "Either one collateral or two guarantors are required",
    function (values) {
      const { collaterals, guarantors } = values || {};
      return (
        (collaterals && collaterals?.length === 1) ||
        (guarantors && guarantors?.length >= 2)
      );
    }
  );

type loanApplicationType = {
  current_balance: number;
  account_id: string;
  amount: number;
  duration: number;
  grace_period: number;
  purpose: string;
  max_loan: number;
  repayment_period_frequency: string;
  collaterals: {
    name: string;
    attachment_photo: File | undefined;
  }[];
  guarantors: {
    name: string;
    phone_number: string;
    occupation: string;
  }[];
};

export type { DepositeType, WithdrawType, loanApplicationType };
