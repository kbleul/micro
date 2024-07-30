import React from "react";
import SignInForm from "@/forms/signin-form";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Sign In"),
};
const Signin = () => {
  return <SignInForm />;
};

export default Signin;
