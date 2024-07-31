"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Title } from "@/components/ui/text";
import Logo from "@public/logo.png";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useState } from "react";

import { Formik, Form } from "formik";
import {
  ForgotPasswordType,
  forgotPasswordSchema,
} from "@/validations/auth.schema";
import FormikInput from "@/components/ui/form/input";
import OtpForm from "./otp-form";
import SetNewPasswordForm from "./set-new-password-form";

export default function ForgotPasswordForm() {
  const [activeStep, setActiveStep] = useState(1);
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [tempPhone, setTempPhone] = useState("");
  const [tempToken, setTempToken] = useState("");
  const initialValues: ForgotPasswordType = {
    phone: "",
  };
  const initialLoginMutationSubmitHandler = async (
    values: ForgotPasswordType
  ) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}reset-password`,
        method: "POST",
        headers,
        body: {
          phone: "251".concat(values.phone),
        },
        onSuccess: () => {
          setTempPhone(values.phone);
          toast.success("Otp Sent To Your Number");
          setActiveStep((p) => p + 1);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {activeStep === 1 && (
        <div className="bg-gradient-to-r from-[#013463] to-[#1D6C8B] flex w-full items-center justify-center min-h-screen p-2">
          <div className="max-w-lg  mx-auto w-full bg-white  p-5 md:p-10 rounded-xl">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex flex-col w-full items-center justify-center">
                <Image
                  src={Logo}
                  alt="logo"
                  className="h-[60px] object-contain"
                />
                <div className="flex flex-col items-center space-y-1 py-4">
                  <Title as="h6" className=" text-center   ">
                    Enter Your Number We Will Send You An OTP To Reset Your
                    Password
                  </Title>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={forgotPasswordSchema}
                onSubmit={initialLoginMutationSubmitHandler}
              >
                {() => (
                  <Form className="space-y-5 w-full">
                    <FormikInput
                      type="number"
                      label="Phone Number"
                      prefix="+251"
                      name="phone"
                      placeholder="Enter Your Phone Number"
                      color="primary"
                    />

                    <Button
                      className="w-full bg-primary-dark hover:opacity-90 focus-hover:opacity-90"
                      type="submit"
                      size="lg"
                      color="primary"
                      isLoading={postMutation.isPending}
                    >
                      <span>Send Otp</span>{" "}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
      {activeStep === 2 && (
        <OtpForm
          phone={tempPhone}
          setActiveStep={setActiveStep}
          setTempToken={setTempToken}
        />
      )}
      {activeStep === 3 && <SetNewPasswordForm />}
    </>
  );
}
