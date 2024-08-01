

import * as Yup from "yup";
export const InterstTermSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    minimum_threshold: Yup.number().min(0, "Minimum threshold has to be grater than or equal to 0").required("Minimum threshold is required"),
    interest_term_id: Yup.string().required("Interst term is required"),
});

type InterstTypeType = Yup.InferType<typeof InterstTermSchema>;


export type { InterstTypeType };
