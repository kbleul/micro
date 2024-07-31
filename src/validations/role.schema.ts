import * as Yup from "yup";
export const RoleSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
});


type RoleType = Yup.InferType<typeof RoleSchema>;

export type { RoleType };
