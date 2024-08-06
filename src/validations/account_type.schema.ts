

import * as Yup from "yup";
export const InterstTermSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    minimum_threshold: Yup.number().min(0, "Minimum threshold has to be grater than or equal to 0").required("Minimum threshold is required"),
    interest_period: Yup.string().required("Intrest period is required"),
    interest_rate: Yup.number().min(0, "Amount is too small").required("Intrest rate is required"),
    saving_period: Yup.string().required("Intrest period is required"),
    penalty_rate: Yup.number().min(0, "Amount is too small").required("Penality rate is required"),
});

type InterstTypeType = Yup.InferType<typeof InterstTermSchema>;


export type { InterstTypeType };
