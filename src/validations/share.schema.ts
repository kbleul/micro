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


export const ShareOwnerSchema = Yup.object().shape({
  share_value: Yup.number().min(0, "Share value has to be grater than or equal to 0").required("Share value is required"),
  total_shares: Yup.number().min(1, "Share value has to be grater than or equal to 1").required("Share amount is required"),
  minimum_share: Yup.number().min(1, "Share amount should be greater than or equal to 1").required("Minimum amount of share is required"),
  maximum_share: Yup.number()
    .required("Maximum amount of share is required")
    .test("is-less-than-total", "Maximum share must be less than total shares", function (value) {
      const { total_shares } = this.parent;
      return value < total_shares;
    })

});

type ShareOwnerType = Yup.InferType<typeof ShareOwnerSchema>;


export type { ShareType, ShareOwnerType };
