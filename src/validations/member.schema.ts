import * as Yup from "yup";
export const MemberSchema = Yup.object().shape({
  first_name: Yup.string().required("First name name is required"),
  // last_name: Yup.string().required("Last name is required"),
  middle_name: Yup.string().required("Middle name is required"),

  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .min(0, "Age is too small")
    .max(150, "Age is too large")
    .required("Age is required"),

  phone_number: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),

  birth_house_number: Yup.string().required("House number is required"),
  current_house_number: Yup.string().required("House number is required"),

  registration_fee: Yup.number()
    .min(0, "Fee is too small")
    .required("Fee is required"),

  initial_balance: Yup.number()
    .min(0, "Disposit is too small")
    .required("Disposit is required"),

  photo: Yup.mixed().required("Photo is required"),
  id_photo: Yup.mixed()
    .typeError("Id image is required")
    .when("method_of_identifcation", {
      is: "national_id",
      then: (schema) => schema.required("Id image is required"),
      otherwise: (schema) => schema.nullable(),
    }),

  marriage_status: Yup.string().required("Mariage status is required"),

  spouse_name: Yup.string()
    .typeError("You must specify a number")
    .when("marriage_status", {
      is: "married",
      then: (schema) => schema.required("Spouse name is required"),
      otherwise: (schema) => schema.nullable(),
    }),

  method_of_identifcation: Yup.string().required("Id type is required"),
  identification_number: Yup.string()
    .typeError("Invalid input")
    .when("method_of_identifcation", {
      is: "digital_id",
      then: (schema) => schema.required("FAN number is required is required"),
      otherwise: (schema) => schema.nullable(),
    }),

  current_region: Yup.string().required("Current region is required"),

  account_type_id: Yup.string().required("Account type is required"),
  term_grace_period: Yup.number().required("Grace period is required"),
  term_amount: Yup.number()
    .min(0, "Amount is too small")
    .required("Grace period is required"),
});

export type MemberType = {
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  phone_number: string;
  age: number;

  birth_place: string | null;
  birth_district: string | null;
  birth_neighborhood: string | null;
  birth_zone: string | null;
  birth_subcity: string | null;
  birth_region: string | null;
  birth_house_number: string | null;

  current_region: string | null;
  current_district: string | null;
  current_neighborhood: string | null;
  current_zone: string | null;
  current_subcity: string | null;
  current_house_number: string | null;

  marriage_status: string;
  spouse_name: string | null;

  registration_fee: number;
  initial_balance: number;

  photo: File | undefined;
  id_photo: File | undefined;

  method_of_identifcation: string;
  identification_number: string | null;
  children: {
    name: string;
    age: number;
    gender: string;
  }[];
  heirs: {
    address: string;
    city: string;
    first_name: string;
    last_name: string;
    house_number: string;
    occupation: string;
    phone_number: string;
    relationship: string;
    subcity: string;
    woreda: string;
    zone: string;
    kebele: string;
  }[];
  emergency_contacts: {
    address: string;
    city: string;
    first_name: string;
    last_name: string;
    house_number: string;
    occupation: string;
    phone_number: string;
    relationship: string;
    subcity: string;
    woreda: string;
    zone: string;
    kebele: string;
  }[];

  account_type_id: string;
  term_grace_period: number;
  term_amount: number;
};
