import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

//forgot password schema flow
export const forgotPasswordSchema = Yup.object().shape({
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
});

export const otpSchema = Yup.object().shape({
  code: Yup.string()
    .min(5, "OTP must be 5 digits long")
    .required("Otp is required"),
});

export const setPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
type ForgotPasswordType = Yup.InferType<typeof forgotPasswordSchema>;
type setNewPasswordType = Yup.InferType<typeof setPasswordSchema>;
type OtpCodeType = Yup.InferType<typeof otpSchema>;
type LoginType = Yup.InferType<typeof loginSchema>;

export type { ForgotPasswordType, setNewPasswordType, OtpCodeType, LoginType };
