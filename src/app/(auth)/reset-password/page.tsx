import React from "react";
import { metaObject } from "@/config/site.config";
import SetNewPasswordForm from "@/forms/set-new-password-form";

export const metadata = {
  ...metaObject("Sign In"),
};
const Signin = () => {
  return <SetNewPasswordForm />;
};

export default Signin;
