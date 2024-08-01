

import * as Yup from "yup";
export const InterstTermsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  grace_period: Yup.number().min(0, "Grace period has to be grater than or equal to 0").required("Interst term is required").required("Grace period is required"),
  interest_rate: Yup.number().max(100, "Rate should be less or equal to 100").required("Interest rate is required"),
  period: Yup.string().required("Period is required"),
});

type InterstTermType = Yup.InferType<typeof InterstTermsSchema>;

export type { InterstTermType };
