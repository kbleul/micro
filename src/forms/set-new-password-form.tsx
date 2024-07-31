"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Title, Text } from "@/components/ui/text";
import Logo from "@public/logo.png";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import PageLoader from "@/components/loader/page-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { Formik, Form } from "formik";
import {
  setNewPasswordType,
  setPasswordSchema,
} from "@/validations/auth.schema";
import FormikPasswordInput from "@/components/ui/form/password-input";
import { useSession } from "next-auth/react";

export default function SetNewPasswordForm() {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const postMutation = useDynamicMutation();
  const headers = {
    Authorization: `Bearer ${session?.user.token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const initialValues: setNewPasswordType = {
    password: "",
    confirmPassword: "",
  };
  const setNewPasswordMutationSubmitHandler = async (
    values: setNewPasswordType
  ) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}create-password`,
        method: "POST",
        headers,
        body: {
          confirm_password: values.confirmPassword,
          password: values.password,
        },
        onSuccess: () => {
          setIsLoading(true);
          toast.success("Password Reset Successfully");

          router.push(routes.signIn);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <PageLoader />;
  return (
    <div className="bg-gradient-to-r from-[#008579] to-[#00BA63] flex w-full items-center justify-center min-h-screen p-2">
      <div className="max-w-lg  mx-auto w-full bg-white  p-5 md:p-10 rounded-xl">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex flex-col w-full items-center justify-center">
            <Image src={Logo} alt="logo" className="h-[60px] object-contain" />
            <div className="flex flex-col items-center space-y-1 py-4">
              <Title as="h5" className=" text-center   ">
                Set Your New Password
              </Title>
              <Text as="p" className="font-medium">
                You only need to do this once
              </Text>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={setPasswordSchema}
            onSubmit={setNewPasswordMutationSubmitHandler}
          >
            {() => (
              <Form className="space-y-5 w-full">
                <FormikPasswordInput
                  name="password"
                  label="Password"
                  placeholder="Enter Your Password"
                  color="primary"
                />
                <FormikPasswordInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm Your Password"
                  color="primary"
                />

                <Button
                  className="w-full hover:bg-primary"
                  type="submit"
                  size="lg"
                  color="primary"
                  isLoading={postMutation.isPending}
                >
                  <span>Set Password</span>{" "}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
