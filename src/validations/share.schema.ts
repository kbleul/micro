import { paymentChannels } from "@/utils/dummy";
import * as Yup from "yup";
export const ShareSchema = Yup.object().shape({
  number_of_shares: Yup.number()
    .required("Number of shares is required")
    .min(1, "Share number has to be greater than 1"),
  payment_channel: Yup.string().required("Payment channel is required"),
  cheque_number: Yup.string()
    .typeError("Invalid cheque number.")
    .when("payment_channel", {
      is: paymentChannels.cheque,
      then: (schema) => schema.required("Cheque number is required"),
      otherwise: (schema) => schema.nullable(),
    }),
});

type ShareType = {
  number_of_shares: number;
  payment_channel: string | null;
  cheque_number: string | null;
};

export type { ShareType };
