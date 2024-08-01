import * as Yup from "yup";
export const BranchSchema = Yup.object().shape({
  name: Yup.string().required("Branch name is required"),
  phone_number: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  city: Yup.string().required("City is required"),
  region: Yup.string().required("Region is required"),
  address: Yup.string().required("Address is required"),
});

type BranchType = Yup.InferType<typeof BranchSchema>;

export type { BranchType };
