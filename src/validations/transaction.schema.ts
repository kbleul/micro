import * as Yup from "yup";
export const DepositeSchema = Yup.object().shape({
    account_id: Yup.string().required("Name is required"),
    amount: Yup.number().min(0, "Amount is too small").required("Amount is required"),
});


type DepositeType = Yup.InferType<typeof DepositeSchema>;


export const WithdrawSchema = Yup.object().shape({
    account_id: Yup.string().required("Name is required"),
    amount: Yup.number().min(0, "Amount is too small").required("Amount is required"),
    current_balance: Yup.string(),
});


type WithdrawType = Yup.InferType<typeof WithdrawSchema>;

export type { DepositeType };
