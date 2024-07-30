import * as Yup from "yup";

export const chnagePasswordSchema = Yup.object().shape({
  password: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

type ChnagePasswordType = Yup.InferType<typeof chnagePasswordSchema>;

export type { ChnagePasswordType };
