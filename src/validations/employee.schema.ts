import * as Yup from "yup";
export const EmployeeSchema = Yup.object().shape({
  first_name: Yup.string().required("First name name is required"),
  last_name: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role name is required"),
  date_of_birth: Yup.date().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),

  phone_number: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    branch_name: Yup.string().required("Branch is required")
});

export type EmployeeType = {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date | undefined;
  phone_number: string;
  email: string;
  tin_number: string;
  role: string;
  branch_name: string | null
};


