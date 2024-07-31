"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Title } from "@/components/ui/text";
import Logo from "@public/logo.png";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { PinCode } from "@/components/ui/pin-code";
import { OtpCodeType, otpSchema } from "@/validations/auth.schema";

interface Props {
  phone: string;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setTempToken: React.Dispatch<React.SetStateAction<string>>;
}
const OtpForm = ({ phone, setActiveStep, setTempToken }: Props) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });

  const initialValues: OtpCodeType = {
    code: "",
  };
  const initialLoginMutationSubmitHandler = async (values: OtpCodeType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}verify-otp`,
        method: "POST",
        headers,
        body: {
          phone: "251".concat(phone),
          otp: values.code,
        },
        onSuccess: (res) => {
          setTempToken(res?.data?.token);
          setActiveStep((p) => p + 1);
          toast.success("Successfully Verified");
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
    <div className="bg-gradient-to-r from-[#013463] to-[#1D6C8B] flex w-full items-center justify-center min-h-screen p-2">
      <div className="max-w-lg  mx-auto w-full bg-white  p-5 md:p-10 rounded-xl">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex flex-col w-full items-center justify-center">
            <Image src={Logo} alt="logo" className="h-[60px] object-contain" />
            <div className="flex flex-col items-center space-y-1 py-4">
              <Title as="h6" className=" text-center   ">
                Enter The OTP We Sent To 251{phone}
              </Title>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={otpSchema}
            onSubmit={initialLoginMutationSubmitHandler}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-5 w-full">
                <div className="mt-1">
                  <PinCode
                    setValue={(value) => setFieldValue("code", Number(value))}
                    size="lg"
                    name="code"
                    length={5}
                    type="number"
                    color="primary"
                    placeholder="-"
                  />
                  <ErrorMessage
                    name="code"
                    component={"div"}
                    className="text-red-500 capitalize font-medium"
                  />
                </div>
                <Button
                  className="w-full bg-primary-dark hover:opacity-90 focus-hover:opacity-90"
                  type="submit"
                  size="lg"
                  color="primary"
                  isLoading={postMutation.isPending}
                >
                  <span>Verify</span>{" "}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
